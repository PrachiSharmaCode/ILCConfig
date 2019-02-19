import { Injectable } from '@angular/core';
import { PairwiseModel} from '../../model/pairwise.model';

@Injectable({
  providedIn: 'root'
})
export class PairwiseService {

  finalCalculation = ' ';

  pairwise = new PairwiseModel('', '', '', '', '',
    '', '', '', '', '');

  createPairwiseCalculation(pairwise: PairwiseModel) {
    this.pairwise.zoneStage = pairwise.zoneStage;
    this.pairwise.zoneHistoryTemp = pairwise.zoneHistoryTemp;
    this.pairwise.zoneRatedPower = pairwise.zoneRatedPower;
    this.pairwise.zoneRoomType = pairwise.zoneRoomType;

    this.pairwise.stageHistoryTemp = pairwise.stageHistoryTemp;
    this.pairwise.stageRatedPower = pairwise.stageRatedPower;
    this.pairwise.stageRoomType = pairwise.stageRoomType;

    this.pairwise.historyRatedPower = pairwise.historyRatedPower;
    this.pairwise.historyRoomeType = pairwise.historyRoomeType;

    this.pairwise.ratedRoomType = pairwise.ratedRoomType;

    console.log(this.pairwise.zoneRatedPower + 'serviceRp');
    console.log(this.pairwise.zoneRoomType +  'serviceRt');

    this.finalCalculation =
      '{\n' +
      '\t\"zonetemperature-setpoint\":{\n' +
      '\t\t\"stage\":' + this.pairwise.zoneStage + '\n' +
      '\t\t\"history-zonetemperature\":' + this.pairwise.zoneHistoryTemp + '\n ' +
      '\t\t\"rated-power\":' + this.pairwise.zoneRatedPower + '\n' +
      '\t\t\"room-type\":' + this.pairwise.zoneRoomType + '\n ' +
      '\t\t}\,\n' +

      '\t\"stage\":{\n' +
      '\t\t\"history-zonetemperature\":' + this.pairwise.stageHistoryTemp + '\n' +
      '\t\t\"rated-power\":' + this.pairwise.stageRatedPower + '\n ' +
      '\t\t\"room-type\":[' + this.pairwise.stageRoomType + '\n ' +
      '\t\t}\,\n' +

      '\t\"history-zonetemperature\":{\n' +
      '\t\t\"rated-power\":' + this.pairwise.historyRatedPower + '\n ' +
      '\t\t\"room-type\":' + this.pairwise.historyRoomeType + '\n ' +
      '\t\t}\,\n' +

      '\t\"rated-power\":{\n' +
      '\t\t\"room-type\":' + this.pairwise.ratedRoomType + '\n ' +
      '\t\t}\,\n' +

      '\t\"room-type\":{\n' +
      '\t\t\"room-type\":{}\n ' +
      '\t\t}\,\n' +
      '}\n' ;
  }

  getFinalCalculation() {
    return this.finalCalculation;
  }

  getPairwise()
  {
    return this.pairwise;
  }


}
