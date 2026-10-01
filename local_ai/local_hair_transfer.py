import cv2
import numpy as np
from pathlib import Path


# ============================================================
# FILES
# ============================================================

BASE = Path(__file__).resolve().parent

PERSON = BASE / "input" / "person.jpg"
HAIRSTYLE = BASE / "input" / "hairstyle.jpg"
OUTPUT = BASE / "output" / "result.jpg"


# ============================================================
# LOAD IMAGES
# ============================================================

person = cv2.imread(str(PERSON))
hairstyle = cv2.imread(str(HAIRSTYLE))

if person is None:
    raise FileNotFoundError(f"Person image not found: {PERSON}")

if hairstyle is None:
    raise FileNotFoundError(f"Hairstyle image not found: {HAIRSTYLE}")


# ============================================================
# RESIZE FOR CPU
# ============================================================

MAX_SIZE = 900


def resize_image(image):
    h, w = image.shape[:2]

    scale = min(1.0, MAX_SIZE / max(h, w))

    if scale < 1:
        image = cv2.resize(
            image,
            (int(w * scale), int(h * scale)),
            interpolation=cv2.INTER_AREA
        )

    return image


person = resize_image(person)
hairstyle = resize_image(hairstyle)


# ============================================================
# FACE DETECTOR
# ============================================================

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades +
    "haarcascade_frontalface_default.xml"
)


def detect_face(image):

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(80, 80)
    )

    if len(faces) == 0:
        return None

    # Largest detected face
    return max(
        faces,
        key=lambda box: box[2] * box[3]
    )


# ============================================================
# DETECT FACES
# ============================================================

person_face = detect_face(person)
reference_face = detect_face(hairstyle)

if person_face is None:
    raise RuntimeError(
        "Could not detect a face in person.jpg"
    )

if reference_face is None:
    raise RuntimeError(
        "Could not detect a face in hairstyle.jpg"
    )


px, py, pw, ph = person_face
rx, ry, rw, rh = reference_face


# ============================================================
# CREATE HAIR REGION FROM REFERENCE
# ============================================================

# Hair area above and around reference face
hair_top = max(0, ry - int(rh * 1.15))
hair_bottom = min(
    hairstyle.shape[0],
    ry + int(rh * 0.65)
)

hair_left = max(
    0,
    rx - int(rw * 0.75)
)

hair_right = min(
    hairstyle.shape[1],
    rx + rw + int(rw * 0.75)
)

hair_crop = hairstyle[
    hair_top:hair_bottom,
    hair_left:hair_right
]

if hair_crop.size == 0:
    raise RuntimeError("Could not create hairstyle region.")


# ============================================================
# CREATE SIMPLE HAIR MASK
# ============================================================

h, w = hair_crop.shape[:2]

mask = np.zeros((h, w), dtype=np.uint8)

center = (
    int(w * 0.50),
    int(h * 0.48)
)

axes = (
    max(1, int(w * 0.47)),
    max(1, int(h * 0.50))
)

cv2.ellipse(
    mask,
    center,
    axes,
    0,
    0,
    360,
    255,
    -1
)


# Remove the central face area
face_x = rx - hair_left
face_y = ry - hair_top

cv2.ellipse(
    mask,
    (
        int(face_x + rw / 2),
        int(face_y + rh / 2)
    ),
    (
        int(rw * 0.48),
        int(rh * 0.52)
    ),
    0,
    0,
    360,
    0,
    -1
)


# ============================================================
# RESIZE HAIR TO PERSON
# ============================================================

target_width = int(pw * 2.25)
target_height = int(ph * 2.15)

hair_crop = cv2.resize(
    hair_crop,
    (target_width, target_height),
    interpolation=cv2.INTER_AREA
)

mask = cv2.resize(
    mask,
    (target_width, target_height),
    interpolation=cv2.INTER_LINEAR
)


# ============================================================
# FEATHER MASK
# ============================================================

mask = cv2.GaussianBlur(
    mask,
    (31, 31),
    0
)


# ============================================================
# POSITION HAIR
# ============================================================

target_x = int(
    px + pw / 2 - target_width / 2
)

target_y = int(
    py - ph * 0.95
)


# ============================================================
# CLIP TO PERSON IMAGE
# ============================================================

x1 = max(0, target_x)
y1 = max(0, target_y)

x2 = min(person.shape[1], target_x + target_width)
y2 = min(person.shape[0], target_y + target_height)

if x1 >= x2 or y1 >= y2:
    raise RuntimeError("Hairstyle position is outside image.")


crop_x1 = x1 - target_x
crop_y1 = y1 - target_y

crop_x2 = crop_x1 + (x2 - x1)
crop_y2 = crop_y1 + (y2 - y1)


hair_part = hair_crop[
    crop_y1:crop_y2,
    crop_x1:crop_x2
]

mask_part = mask[
    crop_y1:crop_y2,
    crop_x1:crop_x2
]


# ============================================================
# PROTECT FACE
# ============================================================

face_mask = np.zeros(
    (y2 - y1, x2 - x1),
    dtype=np.uint8
)

local_face_x = px - x1
local_face_y = py - y1

cv2.ellipse(
    face_mask,
    (
        int(local_face_x + pw / 2),
        int(local_face_y + ph / 2)
    ),
    (
        int(pw * 0.48),
        int(ph * 0.52)
    ),
    0,
    0,
    360,
    255,
    -1
)

mask_part = np.where(
    face_mask > 0,
    0,
    mask_part
).astype(np.uint8)


# ============================================================
# BLEND
# ============================================================

background = person[y1:y2, x1:x2]

alpha = (
    mask_part.astype(np.float32) / 255.0
)

alpha = alpha[:, :, None]

result_part = (
    hair_part.astype(np.float32) * alpha +
    background.astype(np.float32) * (1 - alpha)
)

result_part = np.clip(
    result_part,
    0,
    255
).astype(np.uint8)


person[y1:y2, x1:x2] = result_part


# ============================================================
# SAVE
# ============================================================

OUTPUT.parent.mkdir(
    parents=True,
    exist_ok=True
)

cv2.imwrite(
    str(OUTPUT),
    person,
    [cv2.IMWRITE_JPEG_QUALITY, 95]
)

print()
print("======================================")
print(" STYLEME TEST COMPLETE")
print("======================================")
print(f"Output: {OUTPUT}")
print()
