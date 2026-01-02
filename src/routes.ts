export const router = () => {
    
    const routes: Record<string, string> = {
        "/": "/src/staticScreens/loginScreen.html",
        "/login": "/src/staticScreens/loginScreen.html",
        "/signup": "/src/staticScreens/signupScreen.html",
        "/game": "/src/staticScreens/gameScreen.html",
    };

    const handleLocation = async () => {
        const path = window.location.pathname;
        const route = routes[path] || routes["/404"];
        
        try {
            const response = await fetch(route);
            if (!response.ok) throw new Error('Route not found');
            const html = await response.text();
            
            const appDiv = document.querySelector('#app');
            if (appDiv) {
                appDiv.innerHTML = html;
            }
        } catch (error) {
            const appDiv = document.querySelector('#app');
            if (appDiv) appDiv.innerHTML = "<h1>404 - Page not found</h1>";
        }
    };

    document.addEventListener("click", (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.matches("[data-link]")) {
            e.preventDefault();
            // @ts-ignore
            window.history.pushState({}, "", target.href);
            handleLocation();
        }
    });

    window.onpopstate = handleLocation;
    handleLocation();
};