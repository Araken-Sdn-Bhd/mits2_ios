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
import NetInfo from '@react-native-community/netinfo';
import Http from '../common/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormDateTime, FormDropdown, FormInput, FormRadioButton, FormTextArea } from './component';

export default class SetProgress extends React.Component {
  static contextType = GlobalContext;
  formInput=[];
  commonInput=[];
  constructor(props) {
    super(props);
    this.formInput = [
      {
        segment: 'PRIMARY QUESTION',
        show: false,
        question: [
      		// {key:'added_by', title: 'added_by', flag: 0, typ: 'text', val: ''},
          {key:'patient_id', title: 'Patient list', flag: 1, val: '', option: []},
          {key:'mrn', title: 'MRNXXXXXXXX', flag: 0, typ: 'text', val: ''},
          {key:'name', title: 'Name', flag: 0, typ: 'text', val: ''},
          {key:'date', title: 'Date', open:false, flag: 2, typ: 'date', val: ''},
          {key:'time', title: 'Time', open:false, flag: 2, typ: 'time', val: ''},
          {key:'staff_name', title: 'Staff Name', flag: 0, typ: 'text', val: ''},
          {key:'activity_type', title: 'Type of activities', flag: 1, val: '', option: []},
          {key:'employment_status', title: 'Employment status', flag: 1, val: '', option: []},
          {key:'progress_note', title: 'Progress note', flag: 0, typ: 'text', val: ''},
          {key:'management_plan', title: 'Management plan', flag: 0, typ: 'text', val: ''},
          
        ],
      },
      {
        segment: 'OCCASION OF SERVICES',
        show: !false,
        question: [
          {key:'location_service', title: 'Location of services', flag: 1, val: '', option: []},
          {key:'diagnosis_type', title: 'Type of diagnosis', flag: 1, val: '', option: []},
          {
            key:'service_category', title: 'Category of services', flag: 9, val: 'assisstance', option: [
              {id:'assisstance',section_value:'Assistant/supervision'},
              {id:'clinical',section_value:'Clinical work'},
              {id:'external',section_value:'External'},
            ],
            onchange:{i:0,j:0,api:''}, 
            otherValues:{code_id:0,sel_val:'',sub_code_id:0,services_id:0}, 
            otherData:{icd9:[],icd10:[],external:[],assistance:[]},
          },
          {key:'complexity_service', title: 'Complexity of services', flag: 1, val: '', option: []},
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
    ];
    this.commonInput = [
    ];

    this.state = {
      loading: false,
    };
    this.submitData = this.submitData.bind(this);
  }

  submitData(){
    const {submitSEPNData,user} = this.context;
    var SEND = {};
    var flag = true;

    this.formInput.forEach(e=>{
      e.question.forEach(f=>{
        if (f.flag == 9){
          if(f.val=="clinical"){
            SEND.code_id = f.otherValues.code_id;
            SEND.sub_code_id = f.otherValues.sub_code_id;
            SEND.services_id ="";
          }else{
            SEND.services_id = f.otherValues.service_id;
            SEND.code_id = "";
            SEND.sub_code_id = "";

          }

          console.log("9 == ",f);
        }
        if ((!f.val || f.val == '') && flag){
          Http._toast(f.title + ' is required');
          flag = false;
        }
        SEND[f.key] = f.val;
      });
    });

    SEND.added_by = user.user.id;
    SEND.patient_mrn_id = SEND["patient_id"];
    SEND.status = 0;
    console.log("Alldata >>",SEND);

    if (flag){
      submitSEPNData(SEND).then(r=>{
        console.log(r);
        if(r['status']){
          this.formInput.forEach((e,i)=>{
            e.question.forEach((f,j)=>{
              this.formInput[i]['question'][j]['val']=''; 
            });
          });
          this.setState({});
        }
      }).catch(e=>{
        console.log(e);
      });
    }
  }

  componentDidMount(){
    const {submitCPSData,user} = this.context;
    this.formInput[0].question[5].val = user.user.name;
  NetInfo.fetch().then(state => {
    [
      ['general-setting/list?section=type-of-activities',0,6,'id','section_value'],
      ['general-setting/list?section=employment-status',0,7,'id','section_value'],
      ['general-setting/list?section=location-of-services',1,0,'id','section_value'],
      ['diagnosis/getIcd10codeList2',1,1,'id','section_value'],
      ['general-setting/list?section=complexity-of-service',1,3,'id','section_value'],
      ['general-setting/list?section=outcome',1,4,'id','section_value'],
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
            // console.log(dd[1],dd[2],this.formInput[dd[1]].question[dd[2]].title, '++ ',this.formInput[dd[1]].question[dd[2]].option);
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
          console.log(dd[1],">>>",r); 
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

    // {"age": 24, "appointments": "NA", "id": 1, "nric_no": "980801012200", "passport_no": "NA", "patient_mrn": "MRN000000001", "salutation": "NA", "section_value": "Fatin Nur Khalisyah binti Abdul Hamid", "service": "Consultation", "team_name": "NA"},

    if (state.isConnected){
      console.log('branch_id',user.branch.branch_id);
      Http.GET('patient-registration/getPatientRegistrationListMobile').then(r=>{
        this.formInput[0].question[0].option = [];
        console.log("patient data : ",r);
        if (r.code == 200){

          // this.formInput[0].question[0].option = r.list.map(e=>{
          //   console.log('eeeeeeeeeee',e.branch_id);
          //   // var tmp = {'id':e[dd['3']] , 'section_value':e[dd['4']]};
          //   if(user.branch.branch_id == e.branch_id){
          //     console.log('ggggggg',e);
          //     this.formInput[0].question[0].option = e;
          //   }
          //   return e;
          // });
          // AsyncStorage.setItem(this.formInput[0].question[0].option,JSON.stringify(this.formInput[0].question[0].option));
          // this.setState({});

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
        <Text style={{textAlign:'center',flex:1,fontWeight:'bold',fontSize:20,color:'gray'}}>SE PROGRESS NOTE</Text>
      </View>
      <ScrollView>
        {
          this.formInput.map((e,i)=>{
            return <View key={'inp2' + i} style={{margin:10}}>
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
                    <View key={'inp' + j} style={{marginVertical:10,marginHorizontal:5}}>
                      <Text style={{fontSize:15,fontWeight:'bold',color:'gray',marginBottom:2}}>{f.title}</Text>
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
                              this.formInput[0].question[2].val = item.section_value;
                            }
                          this.formInput[i].question[j].val = item.id;
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
                            <Text style={{color:'gray'}}> {(this.formInput[i].question[j].val == '') ? 'Select' + f.title : this.formInput[i].question[j].val} </Text>
                            <DatePicker
                              modal
                              mode={f.typ}
                              open={f.open}
                              date={new Date()}

                              onConfirm={(date) => {
                                this.formInput[i].question[j].val = (f.typ == 'date') ? `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` : `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
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
                        (f.flag == 4) ?
                        (
                        <FormTextArea value={f.val} action={txt => {
                            this.formInput[i].question[j].val = txt;
                            this.setState({});
                          }} />
                        ) :
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
                    </View>
                  );
                }) : null
              }
            </View>;
          })
        }

        <TouchableOpacity
          style={{backgroundColor:'darkblue',borderRadius:10,padding:10,margin:10}}
          onPress={this.submitData}>
          <Text  style={{textAlign:'center', color:'white', fontSize:20,fontWeight:'bold',marginBottom:2}}>Submit</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
    );
  }
}
