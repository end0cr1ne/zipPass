const { verifyJwtToken } = require("../sso-consumer/jwt_verify");

let simplepass = {
    authenticated: () => {
        if(localStorage.getItem('sp_token')) return true
        else false
    },
    makeLoginButton: (div, callback) => {
        function getQueryParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }

        function verifyJwtToken(simplePass) {
            fetch(`https://simple-sso-server.fly.dev/simplesso/verifytoken?ssoToken=${simplePass}`).then(res => res.json())
            .then(data => {
                callback()
                localStorage.setItem('sp_token', data.token)
            })
        }

        function loginFunction() {
            if(!authenticated) {
                //Check if a redurect token exists in the URL
                const simplePass = getQueryParam('simplePass');

                if (simplePass) {
                    // If 'simplePass' is present, call the endpoint
                    verifyJwtToken(simplePass);
                } else {
                    // If 'simplePass' is not present, redirect the page
                    window.location.href = `https://simple-sso-server.fly.dev/simplesso/login?serviceURL=${window.location.href}`; // Replace with your actual redirect URL
                }
            }
        }

        // Create the button element
        const button = document.createElement("button");

        button.innerHTML = "Login with Simple Pass";
        if(this.authenticated) {
            callback() //The User is already Logged in
            button.innerHTML = "Logged in with Simple Pass";
        }

        // Apply styles directly using JavaScript
        button.style.backgroundColor = "red";
        button.style.color = "white";
        button.style.padding = "10px 20px";
        button.style.fontSize = "16px";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";
        button.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        button.style.transition = "background-color 0.3s, box-shadow 0.3s";

        // Handle hover effects
        button.addEventListener("mouseover", function() {
            button.style.backgroundColor = "darkred";
            button.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.2)";
        });

        button.addEventListener("mouseout", function() {
            button.style.backgroundColor = "red";
            button.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        });

        // Attach the click event to the button
        button.addEventListener("click", loginFunction);

        // Insert the button into the page
        document.getElementById(div).appendChild(button);
    }
}