import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formula-criteria',
  templateUrl: './formula-criteria.component.html',
  styleUrls: ['./formula-criteria.component.css']
})
export class FormulaCriteriaComponent implements OnInit {

  arguments = [''];
  constructor() { }

  addArguments(){
    this.arguments.push('');
  }

  ngOnInit() {
  }

  trackByIndex(index: number): any {
    return index;
  }

}
