import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RapportService } from '../services/rapport.service';
import { Rapport } from '../models/rapport';
import { Reclamation } from '../models/reclamation';
import { ProblemService } from '../services/problem.service';
import { Rating } from '../models/Rating';


@Component({
  selector: 'app-details',
  templateUrl: '../views/details.component.html',
  styleUrls: ['../css/details.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DetailsComponent implements OnInit {
  
  @Input('rating') public rating: number = 0;
  @Input('starCount') public starCount: number = 5;
  @Input('color') public color: string = 'accent';
  @Output() public ratingUpdated = new EventEmitter();
report;
  public problem : Reclamation;
  public Report : Rapport;
  public identity;
  public id;
  public idr;
  loading: string;
  public admin=false;
  public employe=false;
  public user=false;
  public show;
  public role;
  public image;
  public ratingArr = [];
  public rat:Rating;

  constructor(private _problemservice: ProblemService,private _userService:ProblemService,private _rapportservice: RapportService,private _route: ActivatedRoute,private router: Router) {
    this.identity = _problemservice.getIdentity();
   }



  ngOnInit(): void {
    if(this._userService.getIdentity()['role']=='admin')
  this.admin= true
  else if(this._userService.getIdentity()['role']=='employe')
  this.employe= true
  else if(this._userService.getIdentity()['role']=='user')
  this.user= true
this.role=this._userService.getIdentity()['role'];
    this.image=this._userService.getIdentity()['image'];
    
    
    console.log(this.identity);

    this._route.params.forEach((params: Params)=>{
     let id = +params['id'];
     this.Report = new Rapport('',this.identity['id'],id);
     this.getProblem();
     this.getall();

      })
      
      for (let index = 0; index < this.starCount; index++) {
        this.ratingArr.push(index);
      }
    }
  

  getProblem(){
    
    this.loading = 'show';
    this._route.params.forEach((params: Params)=>{
      let id = +params['id'];
      this.idr=id;
      console.log('id u',id);
      this._problemservice.getProblem(id).subscribe(value =>{
        this.problem = value['data'][0];
        console.log(value['data']);
        
      })

    });
    
  }
  update(){
    
    this._problemservice.updateProblem(this.problem).subscribe(value=>{
      
      this.router.navigate(['/list']);
    });
  }

  
onSubmit(){

this._problemservice.createReport(this.Report).subscribe(value=>{
  
})
this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
  this.router.navigate(['/Details/'+this.idr]);
}); 

}
getall(){
  
  this._rapportservice.getrep(this.idr).subscribe(values=>{
    
    if(values[0].stat=='success'){
    this.report=values;
    
    this.loading = 'hide';
    this.show=true;}
  else{
this.show=false;
this.loading = 'hide';}});
 
  
}





delete(id){
  if(confirm("Are you sure to delete ")){
    
  this._problemservice.deleteR(id).subscribe(
    response => {
      if(response['stat'] == 'success'){
        window.location.reload();
      }else if(response['stat'] == '404'){
        alert('report was not deleted');
      }
    },
    error =>{
      console.log(<any>error);
    }
  );
  }
}

onClick(rating:number) {
  console.log(rating)
  this.rating=(rating);
  console.log(this._userService.getIdentity()['id'])
  this.rat=new Rating(this._userService.getIdentity()['id'],this.idr,this.rating);
  this._rapportservice.sendr(this.rat).subscribe(values=>{});
  return false;
}
showIcon(index:number) {
  if (this.rating >= index + 1) {
    return 'star';
  } else {
    return 'star_border';
  }
}

}
