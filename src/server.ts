import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { ForecastController } from './controllers/forecast';

export class SeputServer extends Server {
  private port = 3000;

  constructor(port: number) {
    super();
    this.port = port;
  }

  public init(): void {
    this.setupExpress();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  private setupControllers(): void {
    const forecastController = new ForecastController();
    this.addControllers([forecastController]);
  }
}