import { AxiosStatic } from 'axios';

export class StormGlass {
  readonly stormGlassAPIParams = 'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed';

  readonly stormGlassAPISource = 'noaa';

  constructor(protected request: AxiosStatic) {

  }

  public async fetchPoints(lat: number, lng: number): Promise<{}> {
    return this.request.get(`https://api.stormglass.io/v2/weather/point?params=${this.stormGlassAPIParams}&srouce=${this.stormGlassAPISource}&end=1592113802&lat=${lat}&lng=${lng}`);
  }
}