import { Router } from "express";
import userRoutes from "./modules/users/user.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import bookRoutes from "./modules/books/books.routes.js";
import readsRoutes from "./modules/reads/reads.routes.js";
import reviewRoutes from "./modules/_reviews.ts/reviews.routes.js";
const routes = Router();

const moduleRoutes: { path: string; route: Router }[] = [
   { path: "/users", route: userRoutes },
   { path: "/books", route: bookRoutes },
   { path: "/auth", route: authRoutes },
   { path: '/reads', route: readsRoutes },
   { path: '/reviews', route: reviewRoutes }
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
