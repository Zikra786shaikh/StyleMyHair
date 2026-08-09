const themeButton = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("stylemyhair-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
}


if (themeButton) {

    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("dark-theme");

        const isDark =
            document.body.classList.contains("dark-theme");

        localStorage.setItem(
            "stylemyhair-theme",
            isDark ? "dark" : "light"
        );

    });

}