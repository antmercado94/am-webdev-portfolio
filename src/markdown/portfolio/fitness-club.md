---
title: Fitness Club
slug: fitness-club
date: "12.29.2022"
thumb: portfolio/fitness-club/thumb/fitness-club.png
repo: "https://github.com/antmercado94/fitness-club/tree/static-gatsby"
site: "https://fitness-club-training.netlify.app/"
blog: true
type: portfolio
order: 3
last-modified: 2022-12-29
---

This post is related to my portfolio project, _Fitness Club_. The site can be viewed [here](https://fitness-club-training.netlify.app/), or you can check out the repository [here](https://github.com/antmercado94/fitness-club/tree/static-gatsby).

<br/>

This was a site I made in 2018 after learning the front-end basics&mdash;HTML, CSS, and JS. It was developed as a way to gain a better understanding in regards to creating layouts using [_Flexbox_](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) and [_CSS Grid_](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout). It also uses the [_jQuery_](https://jquery.com/) library for some front-end related interactivity.

More recently, the site was restructured using [Gatsby](https://www.gatsbyjs.com/), making it a little more modern and improved when it comes to performance. I also got rid of the old jQuery code and replaced any related functions using React hooks.

I originally used a library called [_Waypoints_](http://imakewebthings.com/waypoints/), which triggers a function when scrolling near an element on the page. Since I made the change to Gatsby, I've replaced that package with [_React Waypoint_](https://www.npmjs.com/package/react-waypoint). This achieves a similar functionality, but instead a React component is used to wrap around the element where the desired function fires after being scrolled near.

I've used Waypoints several times in this project to trigger a function that will simply make an element on a page appear when scrolled near its parent container.

<figure>

![React Waypoint GIF](./../../images/portfolio/fitness-club/featured/react-waypoint.gif)

<p align="center"><small>React Waypoint in action.</small></p>
</figure>

The old version can still be seen on my Github as the ["master"](https://github.com/antmercado94/fitness-club) branch, while the newer Gatsby version has it's own branch: ["static-gatsby"](https://github.com/antmercado94/fitness-club/tree/static-gatsby).
