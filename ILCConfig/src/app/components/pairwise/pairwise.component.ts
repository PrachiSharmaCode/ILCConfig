import { Component, OnInit } from '@angular/core';
import { PairwiseModel} from '../../model/pairwise.model';
import { PairwiseService} from '../../services/pairwise/pairwise.service';


@Component({
  selector: 'app-pairwise',
  templateUrl: './pairwise.component.html',
  styleUrls: ['./pairwise.component.css']
})
export class PairwiseComponent implements OnInit {

  pairwise: PairwiseModel;

  finalCalcultion = '';

  // Zome Temperature Attributs
  zoneTemp = 5;
  zoneRoomType = 5;
  zoneRatedPower = 5;
  zoneStage = 5;

  // Stage Attributs
  stageZoneTemp = 5;
  stageRoomType = 5;
  stageRatedPower = 5;

  // History Zome Temperature Attributes
  historyRoomType = 5;
  historyRatedPower = 5;

  // Rated Power Attributes
  powerRoomType = '';

  constructor(private pairService: PairwiseService) { }

  setValueZomTemp(value, id) {
    if (id === 'zone') {
      this.zoneTemp = value;
    }
    if (id === 'zoneRoomtype') {
      this.zoneRoomType = value;
    }
    if (id === 'ratedPower') {
      this.zoneRatedPower = value;
    }
    if (id === 'stage') {
      this.zoneStage = value;
    }
  }

  setStageValue(value, id) {
    if (id === 'stageZonetemp') {
      this.stageZoneTemp = value;
    }
    if (id === 'stageRoomType') {
      this.stageRoomType = value;
    }
    if (id === 'stageRatedPower') {
      this.stageRatedPower = value;
    }
  }

  setValueHistoryZomTemp(value, id) {

    if (id === 'historyRoomType') {
      this.historyRoomType = value;
    }
    if (id === 'historyratedPower') {
      this.historyRatedPower = value;
    }
  }

  setValueRatedPower(value, id) {

    if (id === 'powerRoomType') {
      this.powerRoomType = value;
    }
  }

  onRefreshButton() {

    this.pairwise = new PairwiseModel(this.zoneStage, this.zoneTemp, this.zoneRatedPower, this.zoneRoomType,
                    this.stageZoneTemp, this.stageRatedPower, this.stageRoomType, this.historyRatedPower,
                    this.historyRoomType, this.powerRoomType);
    this.pairService.createPairwiseCalculation(this.pairwise);
    this.finalCalcultion = this.pairService.getFinalCalculation();
  }

  ngOnInit() {
    this.pairwise = this.pairService.getPairwise();

    this.zoneStage = this.pairwise.zoneStage;
    this.zoneTemp = this.pairwise.zoneHistoryTemp;
    this.zoneRatedPower = this.pairwise.zoneRatedPower;
    this.zoneRoomType = this.pairwise.zoneRoomType;

    console.log(this.zoneRatedPower + 'componentRp');
    console.log(this.zoneRoomType +  'componentRt');

    this.stageRoomType = this.pairwise.stageRoomType;
    this.stageRatedPower = this.pairwise.stageRatedPower;
    this.stageZoneTemp = this.pairwise.stageHistoryTemp;

    this.historyRatedPower = this.pairwise.historyRatedPower;
    this.historyRoomType = this.pairwise.historyRatedPower;

    this.finalCalcultion = this.pairService.getFinalCalculation();
  }
}
