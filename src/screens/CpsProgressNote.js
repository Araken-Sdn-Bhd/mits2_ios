/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {ScrollView,View,TextInput} from 'react-native';
import { Text } from 'react-native-paper';
import GlobalContext from '../GlobalContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { FormDropdown, FormInput, FormRadioButton, FormTextArea } from './component';
import NetInfo from '@react-native-community/netinfo';
import Http from '../common/http';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CpsProgressNote extends React.Component {
  static contextType = GlobalContext;
  formInput=[];
  constructor(props) {
    super(props);
    this.formInput = [
      {
        segment: 'PRIMARY QUESTION',
        show: !false,
        question: [
          {key:'patient_mrn_id', title: 'Patient list', flag: 1, val: '', option: []},
          {key:'mrn_id', hint:'', title: 'MRN', flag: 0, typ: 'text', val: ''},
          {key:'cps_date', hint:'date', title: 'Date & time Seen by', open:false, flag: 2, typ: 'date', val: ''},
          {key:'cps_time', hint:'time', title: ' Time', open:false, flag: 2, typ: 'time', val: ''},

          {key:'cps_seen_by', hint:'', title: 'Seen By', flag: 1, val: '', option: []},
          {key:'cps_date_discussed', hint:'', title: 'Date & time  Discussed With', open:false, flag: 2, typ: 'date', val: ''},
          {key:'cps_time_discussed', hint:'', title: ' Time', open:false, flag: 2, typ: 'time', val: ''},
          {key:'cps_discussed_with', hint:'', title: 'Discussed With', flag: 1, val: '', option: []},
          {key:'visit_date', hint:'', title: 'Visit Date & time', open:false, flag: 2, typ: 'date', val: ''},
          {key:'visit_time', hint:'', title: ' Time', open:false, flag: 2, typ: 'time', val: ''},
          // {key:'', hint:'', title: null, flag: 1, val: '', option: []},
          {key:'informants_name', hint:'Name', title: 'Informants', flag: 0, typ: 'text', val: ''},
          {key:'informants_relationship', hint:'Relationship', title: 'Relationship', flag: 0, typ: 'text', val: ''},
          {key:'informants_contact', hint:'Contact No', title: 'Contact No', flag: 0, typ: 'text', val: ''},
          {key:'case_manager', hint:'', title:'Case Manager', flag: 1, val: '', option: []},
          {key:'visited_by', hint:'', title: 'Visit By', flag: 0, typ: 'text', val: ''},
          {key:'visit_outcome', hint:'', title: 'Visit Outcome', flag: 1, val: '', option: []},
          {key:'current_intervention', hint:'', title: 'Current Intervention', flag: 1, val: '', option: []},
          {key:'compliance_treatment', hint:'', title: 'Compliance to treatment', flag: 1, val: '', option: []},
          {key:'medication_supervised_by', hint:'', title: 'Medication supervised by', flag: 11,  val: '', option: [] , others:true , key2:'medication_supervised_by_specify' , val2:'' },
          {key:'wage_change_occur', hint:'', title: '', flag: 10, typ: 'radio', val: '', option:[{ id: 'yes', value: 'yes'},{ id: 'No', value: 'No' }], subQus:[
            {key:'change_in_rate', title: 'Change In Rate', flag: 1, val: '', option: [{ id: 'Yes', section_value: 'Per Hour'},{ id: 'Yes', section_value: 'Per Day'},{ id: 'Yes', section_value: 'Per Month'}]},
            {key:'from', hint:'', title: 'From', flag: 0, typ: 'text', val: ''},
            {key:'to', hint:'', title: 'To', flag: 0, typ: 'text', val: ''},
            {key:'on_date', hint:'', title: 'On Date', flag: 0, typ: 'text', val: ''},
            {key:'works_hour_week', hint:'', title: 'Work Hours In A Week', flag: 0, typ: 'text', val: ''},
            {key:'work_schedule', hint:'', title: 'Work Schedule', flag: 0, typ: 'text', val: ''},
            {key:'no_of_current_employee', hint:'', title: 'No Of Current Employee In Company', flag: 0, typ: 'text', val: ''},
            {key:'no_of_other_employee', hint:'', title: 'No Of Other Employees In This Position', flag: 0, typ: 'text', val: ''},
            {key:'during_same_shift', hint:'', title: 'During Same Shift', flag: 0, typ: 'text', val: ''},
          ]},
          {key:'delusions', hint:'',title2: 'PSYCHOPATOLOGY/MENTAL STATE', title: 'Delusions', flag: 3, typ: 'radio', val: '', option: [{id:'Nil',value:'Nil'},{id:'Mild',value:'Mild'},{id:'Moderate',value:'Moderate'},{id:'Severe',value:'Severe'}]},
          {key:'hallucination', hint:'', title: 'Hallucination', flag: 3, typ: 'radio', val: '', option: [{id:'Nil',value:'Nil'},{id:'Mild',value:'Mild'},{id:'Moderate',value:'Moderate'},{id:'Severe',value:'Severe'}]},
          {key:'behavior', hint:'', title: 'Disorganized Speech / Behavior', flag: 3, typ: 'radio', val: '', option: [{id:'Nil',value:'Nil'},{id:'Mild',value:'Mild'},{id:'Moderate',value:'Moderate'},{id:'Severe',value:'Severe'}]},
          {key:'blunted_affect', hint:'', title: 'Blunted affect', flag: 3, typ: 'radio', val: '', option: [{id:'Nil',value:'Nil'},{id:'Mild',value:'Mild'},{id:'Moderate',value:'Moderate'},{id:'Severe',value:'Severe'}]},
          {key:'depression', hint:'', title: 'Depression', flag: 3, typ: 'radio', val: '', option: [{id:'Nil',value:'Nil'},{id:'Mild',value:'Mild'},{id:'Moderate',value:'Moderate'},{id:'Severe',value:'Severe'}]},
          {key:'anxiety', hint:'', title: 'Anxiety', flag: 3, typ: 'radio', val: '', option: [{id:'Nil',value:'Nil'},{id:'Mild',value:'Mild'},{id:'Moderate',value:'Moderate'},{id:'Severe',value:'Severe'}]},
          {key:'disorientation', hint:'', title: 'Disorientation', flag: 3, typ: 'radio', val: '', option: [{id:'Nil',value:'Nil'},{id:'Mild',value:'Mild'},{id:'Moderate',value:'Moderate'},{id:'Severe',value:'Severe'}]},
          {key:'uncooperativeness', hint:'', title: 'Uncooperativeness', flag: 3, typ: 'radio', val: '', option: [{id:'Nil',value:'Nil'},{id:'Mild',value:'Mild'},{id:'Moderate',value:'Moderate'},{id:'Severe',value:'Severe'}]},
          {key:'poor_impulse_control', hint:'', title: 'Poor impulse control', flag: 3, typ: 'radio', val: '', option: [{id:'Nil',value:'Nil'},{id:'Mild',value:'Mild'},{id:'Moderate',value:'Moderate'},{id:'Severe',value:'Severe'}]},
          {key:'other_specify_details', hint:'', title: 'Others, Please specify', flag: 4, typ: 'text', val: ''},
          {key:'others', hint:'', title: null, flag: 3, typ: 'radio', val: '', option: [{id:'Nil',value:'Nil'},{id:'Mild',value:'Mild'},{id:'Moderate',value:'Moderate'},{id:'Severe',value:'Severe'}]},
          {key:'ipsychopathology_remarks', hint:'', title: 'Remark', flag: 4, typ: 'text',line:4, val: ''},
          {key:'', hint:'', title: null, flag: 5, head:'RISK ASSESSMENT'},
          {key:'risk_of_violence', hint:'', title: 'Risk of violence/harm to others', flag: 3, typ: 'radio', val: '', option:[{id:'No',value:'No'},{id:'Low',value:'Low'},{id:'Moderate',value:'Moderate'},{id:'High',value:'High'}]},
          {key:'risk_of_suicide', hint:'', title: 'Risk of sucide', flag: 3, typ: 'radio', val: '', option:[{id:'No',value:'No'},{id:'Low',value:'Low'},{id:'Moderate',value:'Moderate'},{id:'High',value:'High'}]},
          {key:'risk_of_other_deliberate', hint:'', title: 'Risk of deliberate self harm', flag: 3, typ: 'radio', val: '', option:[{id:'No',value:'No'},{id:'Low',value:'Low'},{id:'Moderate',value:'Moderate'},{id:'High',value:'High'}]},
          {key:'risk_of_severe', hint:'', title: 'Risk of severe self-neglect / Serious accidental self-harm', flag: 3, typ: 'radio', val: '', option:[{id:'No',value:'No'},{id:'Low',value:'Low'},{id:'Moderate',value:'Moderate'},{id:'High',value:'High'}]},
          {key:'risk_of_harm', hint:'', title: 'Risk of harm from others / Vulnerability', flag: 3, typ: 'radio', val: '', option:[{id:'No',value:'No'},{id:'Low',value:'Low'},{id:'Moderate',value:'Moderate'},{id:'High',value:'High'}]},

          {key:'changes_in_teratment', hint:'', title: 'Changes in treatment at current visit', flag: 4, typ: 'text',line:4, val: ''},
          {key:'', hint:'', title: null, flag: 5, head:'SIDE EFFECTS'},

          {key:'akathisia', hint:'', title: 'Akathisia', flag: 3, typ: 'radio', val: '', option:[{id:'Absent',value:'Absent'},{id:'Present',value:'Present'}]},
          {key:'acute_dystonia', hint:'', title: 'Acute dystonia', flag: 3, typ: 'radio', val: '', option:[{id:'Absent',value:'Absent'},{id:'Present',value:'Present'}]},
          {key:'parkinsonism', hint:'', title: 'Parkinsonism', flag: 3, typ: 'radio', val: '', option:[{id:'Absent',value:'Absent'},{id:'Present',value:'Present'}]},
          {key:'tardive_dyskinesia', hint:'', title: 'Tardiva dyskinesia', flag: 3, typ: 'radio', val: '', option:[{id:'Absent',value:'Absent'},{id:'Present',value:'Present'}]},
          {key:'tardive_dystonia', hint:'', title: 'Tardive dystonia', flag: 3, typ: 'radio', val: '', option:[{id:'Absent',value:'Absent'},{id:'Present',value:'Present'}]},

          {key:'others_specify', hint:'', title: 'Others,specify', flag: 4, typ: 'text',line:4, val: ''},
          // side_effects_remarks
          {key:'side_effects_remarks', hint:'', title: 'Remarks', flag: 4, typ: 'text',line:4, val: ''},
          // social_performance
          {key:'', hint:'', title: null, flag: 5, head:'INTERVENTION'},

          {key:'psychoeducation', hint:'', title: 'Psychoeducation/counseling', flag: 3, typ: 'radio', val: '', option:[{ id: 'Yes', value: 'Yes'},{ id: 'No', value: 'No' }]},
          {key:'coping_skills', hint:'', title: 'Coping skill training', flag: 3, typ: 'radio', val: '', option:[{ id: 'Yes', value: 'Yes'},{ id: 'No', value: 'No' }]},
          {key:'adl_training', hint:'', title: 'ADL training', flag: 3, typ: 'radio', val: '', option:[{ id: 'Yes', value: 'Yes'},{ id: 'No', value: 'No' }]},
          {key:'supported_employment', hint:'', title: 'Supported employment', flag: 3, typ: 'radio', val: '', option:[{ id: 'Yes', value: 'Yes'},{ id: 'No', value: 'No' }]},
          {key:'family_intervention', hint:'', title: 'Family intervention', flag: 3, typ: 'radio', val: '', option:[{ id: 'Yes', value: 'Yes'},{ id: 'No', value: 'No' }]},

          {key:'intervention_others', hint:'', title: 'Others,specify', flag: 4, typ: 'text',line:4, val: ''},
          {key:'remarks', hint:'', title: 'Remarks', flag: 4, typ: 'text',line:4, val: ''},
          {key:'employment_past_months', hint:'', title: 'Employment the past 6 month', flag: 3, typ: 'radio', val: '', option:[{ id: 'Yes', value: 'Yes'},{ id: 'No', value: 'No' }]},

          {key:'if_employment_yes', hint:'', title: '*If Yes' , flag: 1, val: '', option: [{id:'Part-time',section_value:'Part-time'},{id:'Full-time',section_value:'Full-time'},{id:'Un-paid-family worker',section_value:'Un-paid-family worker'}]},

          // {key:'psychiatric_clinic', hint:'', title: 'Psychiatric clinic', open:false, flag: 2, typ: 'date', val: ''},
          {key:'', hint:'', title: null, flag: 5, head:'FOLLOW UP'},
          {key:'psychiatric_clinic', hint:'Date', title: 'Psychiatric clinic', open:false, flag: 2, typ: 'date', val: ''},
          {key:'im_depot_clinic', hint:'Date', title: 'IM depot in clinic', open:false, flag: 2, typ: 'date', val: ''},
          {key:'next_community_visit', hint:'Date', title: 'Next community visit', open:false, flag: 2, typ: 'date', val: ''},
          {key:'comments', hint:'', title: 'Comments', flag: 4, typ: 'text',line:4, val: ''},
        ],
      },
      {
        segment: 'OCCASION OF SERVICES',
        show: false,
        question: [
          {key:'location_service', title: 'Location of services', flag: 1, val: '', option: []},
          {key:'diagnosis_type', title: 'Type of diagnosis', flag: 1, val: '', option: []},
          {key:'service_category', title: 'Category of services', flag: 9, val: 'assisstance', option: [
            {id:'assisstance',section_value:'Assistant/supervision'},
            {id:'clinical',section_value:'Clinical work'},
            {id:'external',section_value:'External'},
          ],onchange:{i:0,j:0,api:''}, otherValues:{code_id:0,sel_val:'',sub_code_id:0,services_id:0}, otherData:{icd9:[],icd10:[],external:[],assistance:[]}},
          {key:'complexity_services', title: 'Complexity of services', flag: 1, val: '', option: []},
          {key:'outcome', title: 'Outcome', flag: 1, val: '', option: []},
        ],
      },
      {
        segment: 'MEDICATION',
        show: false,
        question: [
          {key:'medication', hint:'', title: 'Comments', flag: 4, typ: 'text',line:4, val: ''},
       ],
      },
      {
        segment: 'SIGNATURE',
        show: false,
        question: [
          {key:'staff_name', hint:'', title: 'Staff name', flag: 0, typ: 'text', val: ''},
          {key:'designation', hint:'', title: 'Designation', flag: 0, typ: 'text', val: ''},
       ],
      },
    ];

// status: "1",

    this.state = {
      loading: false,
    };

    this.submitData = this.submitData.bind(this);
  }

  submitData(){
    const {submitCPSData,user} = this.context;
    var SEND = {};
    var flag = true;
    var errors = '';
    var if_employment_yes_require = false;
    this.formInput.forEach(e=>{
      e.question.forEach(f=>{
        if (f.flag != 5){
          if (f.flag == 9){
            if (f.val == 'clinical'){
              SEND.code_id = f.otherValues.code_id;
              SEND.sub_code_id = f.otherValues.sub_code_id;
              SEND.services_id = '';
            } else {
              SEND.services_id = f.otherValues.service_id;
              SEND.code_id = '';
              SEND.sub_code_id = '';
            }
          }

          if (f.key == 'employment_past_months' && f.val == 'Yes')
            {if_employment_yes_require = true;}


          if (f.flag == 11 && f.val == '263'){
              SEND[f.key2] = f.val2;
          } else if ((f.key != 'if_employment_yes' && (!f.val || f.val == '') && f.title) || (if_employment_yes_require && f.key == 'if_employment_yes' && f.val == '') ){
            errors += f.title + ' is required \n';
            flag = false;
          }

          if (f.key != null && f.key != '')
            {SEND[f.key] = f.val;}
          }
      });
    });
    SEND.status = 0;
    SEND.added_by = user.user.id;
    console.log(flag,SEND);

    if (flag){
      submitCPSData(SEND).then(r=>{
        console.log(r);
        if (r.status){
          this.formInput.forEach((e,i)=>{
            e.question.forEach((f,j)=>{
              this.formInput[i].question[j].val = '';
            });
          });
          this.setState({});
        }
      }).catch(e=>{
        console.log(e);
      });

    } else {
      console.log(errors);
      Http._toast(errors);
    }
  }

  componentDidMount(){
    const {submitCPSData,user} = this.context;
    this.formInput[3].question[0].val = user.user.name;
    this.formInput[3].question[1].val = user.user.role;
    NetInfo.fetch().then(state => {
      [
        ['general-setting/list?section=location-of-services',1,0,'id','section_value'],
        ['general-setting/list?section=complexity-of-service',1,3,'id','section_value'],
        ['general-setting/list?section=outcome',1,4,'id','section_value'],
        ['diagnosis/getIcd10codeList2',1,1,'id','section_value'],
        ['general-setting/list?section=outcome',0,15,'id','section_value'], //visit outcome dropdown
        ['general-setting/list?section=current-interventionl',0,16,'id','section_value'],
        ['general-setting/list?section=compliance-to-treatment',0,17,'id','section_value'],
        ['general-setting/list?section=medication-supervised-by',0,18,'id','section_value'],
      ].forEach(dd=>{
        if (state.isConnected){
          Http.GET(dd[0]).then(r=>{
            this.formInput[dd[1]].question[dd[2]].option = [];
            if (r.code == 200){
              this.formInput[dd[1]].question[dd[2]].option = r.list.map(e=>{
                return {'id':e[dd['3']] , 'section_value':e[dd['4']] };
              });
              AsyncStorage.setItem(dd[0],JSON.stringify(this.formInput[dd[1]].question[dd[2]].option));
              this.setState({});
            } else {
              Http._toast(this.formInput[dd[1]].question[dd[2]].title + ' has not been loaded');
            }
          }).catch(e=>{
            console.log(e);
            Http._toast(this.formInput[dd[1]].question[dd[2]].title + ' has not been loaded');
          });
        } else {
          AsyncStorage.getItem(dd[0]).then(r=>{
            console.log(r);
            if (r){
              this.formInput[dd[1]].question[dd[2]].option = JSON.parse(r);
              this.setState({});
            }
          });
        }
      });
      [
        ['general-setting/list?section=external','external','id','section_value'],
        ['general-setting/list?section=assistance-or-supervision','assistance','id','section_value'],
        ['diagnosis/getIcd9codeList','icd9','id','section_value'],
        ['diagnosis/getIcd9subcodeList_','icd10','id','section_value'],
      ].forEach(dd=>{
        if (state.isConnected){
          Http.GET(dd[0]).then(r=>{
            this.formInput[1].question[2].otherData[dd[1]] = [];
            console.log(r);
            if (r.code == 200){
              this.formInput[1].question[2].otherData[dd[1]] = r.list;
              AsyncStorage.setItem(dd[0],JSON.stringify(this.formInput[1].question[2].otherData[dd[1]]));
              this.setState({});
            } else {
              Http._toast(this.formInput[1].question[2].title + ' [ ' + dd[1] + ' ] has not been loaded');
            }
          }).catch(e=>{
            console.log(e);
            Http._toast(this.formInput[1].question[2].title + ' [ ' + dd[1] + ' ] has not been loaded');
          });
        } else {
          AsyncStorage.getItem(dd[0]).then(r=>{
            console.log(r);
            if (r){
              this.formInput[1].question[2].otherData[dd[1]] = JSON.parse(r);
              this.setState({});
            }
          });
        }
      });
      if (state.isConnected){
        Http.GET('patient-registration/getPatientRegistrationListMobile').then(r=>{
          this.formInput[0].question[0].option = [];
          if (r.code == 200){
            // console.log(r);
            this.formInput[0].question[0].option = r.list.filter(rr=>rr.branch_id == user.branch.branch_id);
            AsyncStorage.setItem('patient-registration/getPatientRegistrationListMobile',JSON.stringify(r.list));
            this.setState({});
          } else {
            Http._toast(' Patient data has not been loaded');
          }
        }).catch(e=>{
          console.log(e);
          Http._toast(' Patient data has not been loaded');
        });
      } else {
        AsyncStorage.getItem('patient-registration/getPatientRegistrationListMobile').then(r=>{
          console.log(r);
          if (r){
             this.formInput[0].question[0].option = JSON.parse(r).filter(rr=>rr.branch_id == user.branch.branch_id);
            this.setState({});
          }
        });
      }
      if (state.isConnected){
        const {submitCPSData,user} = this.context;
        Http.GET('hospital/getServiceByTeamId?email=' + user.user.email).then(r=>{
          console.log('data received =' + JSON.stringify(r));
          this.formInput[0].question[4].option = [];
          this.formInput[0].question[7].option = [];
          this.formInput[0].question[13].option = [];
          if (r.code == 200){
            // this.formInput[0].question[4].option  = r.list.map(e=>{return {id:e.id,section_value:e.name}; }).filter(rr=>rr.branch_id == user.branch.branch_id);
            this.formInput[0].question[4].option = r.stafflist.map(e=>{return {id:e.id,section_value:e.name,branch_id: user.branch.branch_id}; }).filter(rr=>rr.branch_id == user.branch.branch_id);
            this.formInput[0].question[7].option  = r.rolelist.map(e=>{return {id:e.id,section_value:e.name,branch_id: user.branch.branch_id};}).filter(rr=>rr.branch_id == user.branch.branch_id);
            // this.formInput[0].question[7].option = r.list.filter(rr=>rr.branch_id == user.branch.branch_id);
            this.formInput[0].question[13].option  = r.stafflist.map(e=>{return {id:e.id,section_value:e.name,branch_id: user.branch.branch_id}; }).filter(rr=>rr.branch_id == user.branch.branch_id);
            // this.formInput[0].question[13].option = r.list.filter(rr=>rr.branch_id == user.branch.branch_id);
            AsyncStorage.setItem('hospital/getServiceByTeamId?email=' + user.user.email,JSON.stringify(r.list));
            this.setState({});
          } else {
            Http._toast(' Patient data has not been loaded');
          }
        }).catch(e=>{
          console.log(e);
          Http._toast(' Patient data has not been loaded');
        });
      } else {
        AsyncStorage.getItem('hospital/getServiceByTeamId?email=' + user.user.email).then(r=>{
          console.log(r);
          if (r){
             this.formInput[0].question[4].option = JSON.parse(r).filter(rr=>rr.branch_id == user.branch.branch_id);
             this.formInput[0].question[7].option = JSON.parse(r).filter(rr=>rr.branch_id == user.branch.branch_id);
             this.formInput[0].question[13].option = JSON.parse(r).filter(rr=>rr.branch_id == user.branch.branch_id);
             this.setState({});
          }
        });
      }
    });
  }

  render() {
    return (
    <View style={{flex:1}}>
      <View style={{marginVertical:20, flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>{
            const {navigation} = this.props;
            navigation.pop();
        }}>
        <Icon name="chevron-back-outline" style={{}} size={30} />
        </TouchableOpacity>
        <Text style={{textAlign:'center',flex:1,fontWeight:'bold',fontSize:20,color:'gray'}}>Cps Progress Note</Text>
      </View>
      <ScrollView>
        {
          this.formInput.map((e,i)=>{
            return <View style={{margin:10}}>
              <TouchableOpacity onPress={()=>{
                  this.formInput[i].show = !this.formInput[i].show;
                  this.setState({});
                }} style={{ flexDirection:'row',flex:1, backgroundColor:'gray',borderRadius:10,padding:10}} >
                <Text style={{flex:1,color:'white',fontWeight:'bold',fontSize:16}}>{e.segment}</Text>
                <Icon name={e.show ? 'remove-outline' : 'add-outline'}  style={{color:'white'}} size={25} />
              </TouchableOpacity>
              {
                (e.show) ?
                e.question.map((f,j)=>{
                  return (
                    <View style={{marginVertical:10,marginHorizontal:5}}>
                      {
                        (f.title2 != null && f.title2 != '') ?
                          <Text style={{fontSize:14,fontWeight:'bold',color:'gray',marginBottom:2}}> {f.title2}</Text> : null
                      }
                      {
                        (f.title) ?
                        <Text style={{fontSize:15,fontWeight:'bold',color:'gray',marginBottom:2}}>{i} : {j} - {f.title}</Text> : null
                      }

                      {
                        (f.flag == 0) ?
                        (
                          <FormInput title={f.title} value={f.val} action={txt => {
                            this.formInput[i].question[j].val = txt;
                            this.setState({});
                          }}/>
                        ) :
                        (f.flag == 1) ?
                        (<FormDropdown option={f.option} value={f.val} action={item => {
                            if (i == 0 && j == 0){
                              console.log();
                              this.formInput[0].question[1].val = item.patient_mrn;
                              // this.formInput[0].question[2].val = item.section_value;
                            }
                          this.formInput[i].question[j].val = item.id;
                          this.setState({});
                        }} />) :
                        (f.flag == 11) ? (
                          <FormDropdown option={f.option} value={f.val} action={item => {
                            this.formInput[i].question[j].val = item.id;
                            console.log(this.formInput[i].question[j].val);
                            this.setState({});
                          }} />) :
                        (f.flag == 2) ?
                        (
                        <TouchableOpacity
                          onPress={()=>{
                            console.log(this.formInput[i].question[j]);
                            this.formInput[i].question[j].open = true;
                            this.setState({});
                          }}
                          style={{zIndex:99999, borderWidth:1,borderColor:'gray',borderRadius:10,padding:15}}
                          >
                            <Text style={{color:'gray'}}> {(this.formInput[i].question[j].val == '') ? 'Select date' : this.formInput[i].question[j].val} </Text>
                            <DatePicker
                              modal
                              mode={f.typ}
                              open={f.open}
                              date={new Date()}

                              onConfirm={(date) => {
                                this.formInput[i].question[j].val = (f.typ == 'date') ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` : `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                                this.formInput[i].question[j].open = false;
                                this.setState({});
                              }}
                              onCancel={() => {
                                this.formInput[i].question[j].open = false;
                                this.setState({});
                              }}
                            />
                          </TouchableOpacity>
                        ) :
                        (f.flag == 3) ?
                        (
                          <View style={{flexDirection:'row',marginVertical:5}}>
                          {f.option.map((obj, k) => {
                              return <TouchableOpacity
                              onPress={()=>{
                                console.log(obj);
                                this.formInput[i].question[j].val = obj.value;
                                this.setState({});
                              }}
                                style={{
                                  flexDirection:'row',
                                  alignItems:'center',
                                  backgroundColor:'white',
                                  marginRight:10,
                                  padding:10,
                                  borderRadius:10,
                                  }}>
                                <Icon size={18} name={
                                  (this.formInput[i].question[j].val == obj.value) ?
                                  'radio-button-on-outline' : 'radio-button-off-outline'
                                }  />
                                <Text style={{color:'gray'}}>{obj.value}</Text>
                              </TouchableOpacity>;
                            })
                          }
                        </View>
                        ) :
                        (f.flag == 4) ?
                        (
                        <FormTextArea value={f.val} action={txt => {
                            this.formInput[i].question[j].val = txt;
                            this.setState({});
                          }} />
                        ) :
                        (f.flag == 5) ?
                        (
                          <Text style={{flex:1,color:'gray',fontWeight:'bold',fontSize:20}}>{f.head}</Text>
                        )
                        :
                        (f.flag == 9) ?
                        (
                          <View>
                            <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                              {
                                f.option.map((obj, k) => {
                                  return <FormRadioButton
                                    icon={
                                      (this.formInput[i].question[j].val == obj.id) ?
                                      'radio-button-on-outline' : 'radio-button-off-outline'
                                    }
                                    action={()=>{
                                      console.log(obj.id);
                                      this.formInput[i].question[j].val = obj.id;
                                      this.setState({});
                                    }}
                                    text={obj.section_value}
                                  />;
                                })
                              }
                            </View>
                            {
                              //otherValues:{code_id:0,sub_code_id:0}, otherData:{icd9:[],icd10:[]} :
                              (this.formInput[i].question[j].val == 'clinical') ?
                              <View style={{flexDirection:'row',marginTop:10}}>
                                <View style={{flex:1}}>
                                  <Text style={{fontWeight:'bold'}}>ICD 9 code</Text>
                                  <FormDropdown
                                    option={f.otherData.icd9}
                                    value={f.otherValues.code_id}
                                    action={(item)=>{
                                      this.formInput[i].question[j].otherValues.code_id = item.id;
                                      this.formInput[i].question[j].otherValues.sel_val = item.icd_category_code;
                                      this.setState({});
                                    }}
                                  />
                                </View>
                                <View style={{flex:1,marginLeft:5}}>
                                  <Text style={{fontWeight:'bold'}}>ICD 9 sub code</Text>
                                  <FormDropdown
                                    option={f.otherData.icd10.filter(ee=>f.otherValues.sel_val == ee.icd_category_code)}
                                    value={f.otherValues.sub_code_id}
                                    action={(item)=>{
                                      this.formInput[i].question[j].otherValues.sub_code_id = item.id;
                                    }}
                                  />
                                </View>
                              </View>
                              :
                              (this.formInput[i].question[j].val == 'assisstance') ?
                              <View style={{marginTop:10}}>
                                <Text style={{fontWeight:'bold'}}>Services</Text>
                                <FormDropdown
                                  option={f.otherData.assistance}
                                  value={f.otherValues.services_id}
                                  action={(item)=>{
                                    this.formInput[i].question[j].otherValues.service_id = item.id;
                                  }}
                                />
                              </View>
                              :
                              <View style={{marginTop:10}}>
                                <Text style={{fontWeight:'bold'}}>Services</Text>
                                <FormDropdown
                                  option={f.otherData.external}
                                  value={f.otherValues.services_id}
                                  action={(item)=>{
                                    this.formInput[i].question[j].otherValues.service_id = item.id;
                                  }}
                                />
                              </View>
                            }
                          </View>

                        ) : null
                      }
                      <View style={{height:5}} />
                      { (f.flag == 11 && this.formInput[i].question[j].val == '263') ?
                        <FormInput title={' Specify Others '} value={f.val2} action={txt => {
                          this.formInput[i].question[j].val2 = txt;
                          this.setState({});
                        }}/> : null}
                    </View>
                  );
                }) : null
              }
            </View>;
          })
        }

        <TouchableOpacity
          style={{backgroundColor:'darkblue',borderRadius:10,padding:10,margin:10}}
          onPress={()=>{
            this.submitData();
          }}>
          <Text  style={{textAlign:'center', color:'white', fontSize:20,fontWeight:'bold',marginBottom:2}}>Submit</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
    );
  }
}
