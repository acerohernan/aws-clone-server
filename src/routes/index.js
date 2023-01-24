const express = require("express");
const fs = require("fs");
const { route } = require("./user");

function registerRoutes(app) {
  const files = fs.readdirSync(__dirname);
  const routes = files.filter((file) => file !== "index.js");
  routes.forEach((route) => registerRoute(route, app));
}

function registerRoute(routePath, app) {
  const router = require(`./${routePath}`);
  const name = routePath.replace(".js", "");
  app.use(`/${name}`, router);
}

module.exports = {
  registerRoutes,
};
