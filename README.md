<a id="readme-top"></a>
<br />

<div align="center">
  <h2 align="center">Car_rental_api</h2>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

-   car_rental front-end project using the car-rental-api backend.
-   To practice front-end authentication with JWT and react in general.
-   Admin/User UI.
-   Admin dashboard.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

-   ![ReactJS](https://img.shields.io/badge/REACTJS-61DAFB?style=for-the-badge&logo=react&logoColor=black)
-   ![shadcn/ui](https://img.shields.io/badge/SHADCN.UI-000000?style=for-the-badge)
-   ![DaisyUI](https://img.shields.io/badge/DAISYUI-5A0FC8?style=for-the-badge)
-   ![React Router](https://img.shields.io/badge/REACT--ROUTER--DOM-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
-   ![Axios](https://img.shields.io/badge/AXIOS-5A29E4?style=for-the-badge)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

-   [x] create register component
    -   [x] connect the backend api endpoint for register
-   [x] create login component
    -   [x] connect the backend api endpoint for login
-   [x] create jwt connection
    -   [x] use axios
    -   [x] create axios interceptors
        -   [x] set-up jwt to the request header BEARER TOKEN
        -   [x] use refreshToken api end point if initial accessToken expires
-   [x] create refreshToken custom hook
-   [x] set-up routing using react-router-dom
-   [x] create UI components
    -   [x] public ui components
        -   [x] navbar
        -   [x] home page
        -   [x] vehicles page
            -   [x] with pagination
        -   [x] vehicle details page
        -   [x] booking form (need to login before submission)
    -   [x] for user(role) components
        -   [x] testimonials form with logic
        -   [x] booking submission logic
    -   [x] for admin(role) components
        -   [ ] admin dashboard
            -   [ ] vehicles data manipulation (CRUD)
            -   [ ] manipulate testimonials data (CRUD)
            -   [ ] manipulate bookings data (CRUD)
            -   [ ] able to create booking
