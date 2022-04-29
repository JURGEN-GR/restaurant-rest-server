import express, { Application } from 'express';
import cors from 'cors';
import dbConnection from '../database/config';
import authRoutes from '../routes/auth';
import screenRoutes from '../routes/screen';
import restaurantRoutes from '../routes/restaurant';
import roleRoutes from '../routes/role';
import departmentRoutes from '../routes/department';
import userRoutes from '../routes/user';
import menuRoutes from '../routes/menu';
import dishRoutes from '../routes/dish';

export default class Server {
  private app: Application;
  private port: String;
  private apiPaths = {
    user: '/api/user',
    role: '/api/role',
    auth: '/api/auth',
    users: '/api/users',
    screen: '/api/screen',
    restaurant: '/api/restaurant',
    department: '/api/department',
    menu: '/api/menu',
    dish: '/api/dish',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '4000';

    this.connectDB();
    this.middelwares();
    this.routes();
  }

  private async connectDB(): Promise<void> {
    // conectar a monogo
    await dbConnection();
  }

  private middelwares(): void {
    // cors
    this.app.use(cors());
    // body parser
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use(this.apiPaths.auth, authRoutes);
    this.app.use(this.apiPaths.user, userRoutes);
    this.app.use(this.apiPaths.role, roleRoutes);
    this.app.use(this.apiPaths.screen, screenRoutes);
    this.app.use(this.apiPaths.restaurant, restaurantRoutes);
    this.app.use(this.apiPaths.department, departmentRoutes);
    this.app.use(this.apiPaths.menu, menuRoutes);
    this.app.use(this.apiPaths.dish, dishRoutes);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
