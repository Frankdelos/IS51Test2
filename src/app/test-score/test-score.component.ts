import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface ITest {
  id?: number;
  testName: string;
  pointsPossible: number;
  pointsReceived: number;
  percentage: number;
  grade: string;
}

@Component({
  selector: 'app-test-score',
  templateUrl: './test-score.component.html',
  styleUrls: ['./test-score.component.css']
})
export class TestScoreComponent implements OnInit {

  tests: Array<ITest> = [];
  params: string;
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    this.tests = await this.loadTests();

  }

  async loadTests() {
    let tests = JSON.parse(localStorage.getItem('tests'));
    if (tests && tests.length > 0) {
      // contacts = contacts;
    } else {
      tests = await this.loadTestsFromJson();
    }
    console.log('this.contacts from ngOnInit .... ', this.tests);
    this.tests = tests;
    return tests;

  }

  async loadTestsFromJson(){
    const tests = await this.http.get('assests/tests.son').toPromise();
    return tests.json();
  }

  addTest() {
    const test: ITest = {
      id: null,
      testName: null,
      pointsPossible: null,
      pointsReceived: null,
      percentage: null,
      grade: null
    }
    this.tests.unshift(test);
    localStorage.setItem('tests,', JSON.stringify(this.tests));
  }

  deleteItem(index: number) {
    this.tests.splice(index, 1);
    localStorage.setItem('tests', JSON.stringify(this.tests));

  }
  
  saveToLocalStorage(){
    localStorage.setItem('tests', JSON.stringify(this.tests));
    this.toastService.showToast('success', 5000, 'Success: Items Saved');
  
  }

  calculate (test: ITest){
    

  }
  computeGrade(){
    this.router.navigate(['home']);
  
    }

  searchBar(params: string){
    this.tests = this.tests.filter((test: ITest) => {
      return test.testName.toLocaleLowerCase() === params.toLocaleLowerCase();
    })
  }

}
