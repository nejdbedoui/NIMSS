import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RapportService } from '../services/rapport.service';
import { Rapport } from '../models/rapport';
import { Reclamation } from '../models/reclamation';
import { ProblemService } from '../services/problem.service';


@Component({
  selector: 'app-details',
  templateUrl: '../views/details.component.html',
  styleUrls: ['../css/details.component.css']
})
export class DetailsComponent implements OnInit {
  report;
  public problem: Reclamation;
  public Report: Rapport;
  public identity;
  public id;
  public idr;
  loading: string;
  public admin = false;
  public employe = false;
  public user = false;
  public show;
  public role;
  public image;


  constructor(private _problemservice: ProblemService, private _userService: ProblemService, private _rapportservice: RapportService, private _route: ActivatedRoute, private router: Router) {
    this.identity = _problemservice.getIdentity();
  }



  ngOnInit(): void {
    if (this._userService.getIdentity()['role'] == 'admin')
      this.admin = true
    else if (this._userService.getIdentity()['role'] == 'employe')
      this.employe = true
    else if (this._userService.getIdentity()['role'] == 'user')
      this.user = true
    this.role = this._userService.getIdentity()['role'];
    this.image = this._userService.getIdentity()['image'];


    console.log(this.identity);

    this._route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.Report = new Rapport('', this.identity['id'], id);
      this.getProblem();
      this.getall();

    })


  };


  getProblem() {

    this.loading = 'show';
    this._route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.idr = id;
      console.log('id u', id);
      this._problemservice.getProblem(id).subscribe(value => {
        this.problem = value['data'];
        console.log(value['data']);

      })

    });

  }
  update() {

    this._problemservice.updateProblem(this.problem).subscribe(value => {

      this.router.navigate(['/list']);
    });
  }


  onSubmit() {

    this._problemservice.createReport(this.Report).subscribe(value => {

    })
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/Details/' + this.idr]);
    });

  }
  getall() {

    this._rapportservice.getrep(this.idr).subscribe(values => {

      if (values[0].stat == 'success') {
        this.report = values;

        this.loading = 'hide';
        this.show = true;
      }
      else {
        this.show = false;
        this.loading = 'hide';
      }
    });
    this._rapportservice.getrep(this.idr).subscribe(values => { this.report = values });

  }


  delete(id) {
    console.log(id)
    if (confirm("Are you sure to delete ")) {

      this._problemservice.deleteR(id).subscribe(
        response => {
          if (response['stat'] == 'success') {
            window.location.reload();
          } else if (response['stat'] == '404') {
            alert('prob was not deleted');
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }
}
