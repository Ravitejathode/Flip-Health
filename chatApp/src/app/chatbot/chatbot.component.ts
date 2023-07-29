import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  symptoms: any
  inputValue: any
  searchResults: any
  searchInput: any
  constructor(private route: Router, private questionService: QuestionService) {
    this.symptoms = ["abdominal pain","abnormal menstruation","acidity","acute liver failure","altered sensorium","anxiety","back pain","belly pain","blackheads","bladder discomfort","blister","blood in sputum","bloody stool","blurred and distorted vision","breathlessness","brittle nails","bruising","burning micturition","chest pain","chills","cold hands and feet","coma","congestion","constipation","continuous feel of urine","continuous sneezing","cough","cramps","dark urine","dehydration","depression","diarrhoea","dyschromic patches","distention of abdomen","dizziness","drying and tingling lips","enlarged thyroid","excessive hunger","extra marital contacts","family history","fast heart rate","fatigue","fluid overload","foul smell of urine","headache","high fever","hip joint pain","history of alcohol consumption","increased appetite","indigestion","inflammatory nails","internal itching","irregular sugar level","irritability","irritation in anus","itching","joint pain","knee pain","lack of concentration","lethargy","loss of appetite","loss of balance","loss of smell","loss of taste","malaise","mild fever","mood swings","movement stiffness","mucoid sputum","muscle pain","muscle wasting","muscle weakness","nausea","neck pain","nodal skin eruptions","obesity","pain behind the eyes","pain during bowel movements","pain in anal region","painful walking","palpitations","passage of gases","patches in throat","phlegm","polyuria","prominent veins on calf","puffy face and eyes","pus filled pimples","receiving blood transfusion","receiving unsterile injections","red sore around nose","red spots over body","redness of eyes","restlessness","runny nose","rusty sputum","scurrying","shivering","silver like dusting","sinus pressure","skin peeling","skin rash","slurred speech","small dents in nails","spinning movements","spotting urination","stiff neck","stomach bleeding","stomach pain","sunken eyes","sweating","swelled lymph nodes","swelling joints","swelling of stomach","swollen blood vessels","swollen extremities","swollen legs","throat irritation","tiredness","toxic look(typhus)","ulcers on tongue","unsteadiness","visual disturbances","vomiting","watering from eyes","weakness in limbs","weakness of one body side","weight gain","weight loss","yellow crust ooze","yellow urine","yellowing of eyes","yellowish skin"	];
    this.searchResults= []
  }
  ngOnInit() {
    this.inputValue="";
    localStorage.clear();
  }
  onSearch() {
    if(this.inputValue===""){
      this.searchResults=[]
    }
    else{
      this.searchInput = this.inputValue.toLowerCase()
      this.searchResults=[]
      for (let each of this.symptoms){
        if(each.includes(this.searchInput) && !(this.searchResults.includes(each))){
          this.searchResults.push(each)
        }
      }
    }
    // console.log(this.searchResults)
  }
  onSelect(each: any){
    this.inputValue=each;
    this.searchInput="";
    this.searchResults=[];
  }
  onSubmit() {
    // posting the userdetails along with symptom
    if(this.inputValue.length !== 0 && this.symptoms.includes(this.inputValue)){
      this.questionService.setSymptom(this.inputValue);
      this.questionService.postDetails();
      this.route.navigate(['/chatPage']);
    }
  }
}
