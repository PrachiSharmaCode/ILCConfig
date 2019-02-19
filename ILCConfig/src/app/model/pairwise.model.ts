export class PairwiseModel {

  zoneStage: number;
  zoneHistoryTemp: number;
  zoneRatedPower: number;
  zoneRoomType: number;

  stageHistoryTemp: number;
  stageRatedPower: number;
  stageRoomType: number;

  historyRatedPower: number;
  historyRoomeType: number;

  ratedRoomType: number;


  constructor( zoneStage, zoneHistoryTemp, zoneratedPower, zoneRoomtype, stageHistoryTemp, stageRatedPower,
               stageRoomType, historyRatedPower, historyRoomeType, ratedRoomType) {

    this.zoneStage = zoneStage;
    this.zoneHistoryTemp = zoneHistoryTemp;
    this.zoneRatedPower = zoneratedPower;
    this.zoneRoomType = zoneRoomtype;
    this.stageHistoryTemp = stageHistoryTemp;
    this.stageRatedPower = stageRatedPower;
    this.stageRoomType = stageRoomType;
    this.historyRatedPower = historyRatedPower;
    this.historyRoomeType = historyRoomeType;
    this.ratedRoomType = ratedRoomType;
  }
}
