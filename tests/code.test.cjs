const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(
    path.join(process.cwd(), "public/js/code.js"),
    "utf8"
);

function loadApp({ cookie = "", elements = {}, XMLHttpRequest } = {})
{
    const document = {
        cookie,
        getElementById(id)
        {
            return elements[id];
        },
        getElementsByTagName()
        {
            return [];
        }
    };

    const context = {
        document,
        window: { location: { href: "" } },
        XMLHttpRequest: XMLHttpRequest || class {},
        console,
        JSON,
        Date,
        parseInt
    };

    vm.createContext(context);
    vm.runInContext(source, context);

    return context;
}

describe("COLORS front-end", () =>
{
        test("doLogout clears the cookie and returns to the login page", () =>
    {
        const app = loadApp({
            cookie: "firstName=Nick,lastName=Ranfone,userId=7"
        });

        app.doLogout();

        expect(app.document.cookie).toContain(
            "expires = Thu, 01 Jan 1970"
        );
        expect(app.window.location.href).toBe("index.html");
    });

    test("addColor sends the expected JSON and handles a successful response", () =>
    {
        let request;

        class MockXMLHttpRequest
        {
            constructor()
            {
                request = this;
                this.headers = {};
            }

            open(method, url, async)
            {
                this.method = method;
                this.url = url;
                this.async = async;
            }

            setRequestHeader(name, value)
            {
                this.headers[name] = value;
            }

            send(body)
            {
                this.body = body;
                this.readyState = 4;
                this.status = 200;
                this.onreadystatechange();
            }
        }

        const elements = {
            userName: { innerHTML: "" },
            colorText: { value: "Blue" },
            colorAddResult: { innerHTML: "" }
        };

        const app = loadApp({
            cookie: "firstName=Nick,lastName=Ranfone,userId=7",
            elements,
            XMLHttpRequest: MockXMLHttpRequest
        });

        app.readCookie();
        app.addColor();

        expect(request.method).toBe("POST");
        expect(request.url).toMatch(/\/AddColor\.php$/);
        expect(request.async).toBe(true);
        expect(request.headers["Content-type"]).toBe(
            "application/json; charset=UTF-8"
        );
        expect(JSON.parse(request.body)).toEqual({
            color: "Blue",
            userId: 7
        });
        expect(elements.colorAddResult.innerHTML).toBe(
            "Color has been added"
        );
    });
});