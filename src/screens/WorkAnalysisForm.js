/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {ScrollView, View, TextInput} from 'react-native';
import {Text} from 'react-native-paper';
import GlobalContext from '../GlobalContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {
  FormDropdown,
  FormInput,
  FormRadioButton,
  FormTextArea,
} from './component';
import NetInfo from '@react-native-community/netinfo';
import Http from '../common/http';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class WorkAnalysisForm extends React.Component {
  static contextType = GlobalContext;
  formInput = [];
  constructor(props) {
    super(props);
    this.loadForm();
    this.state = {
      loading: false,
    };
    this.submitData = this.submitData.bind(this);
  }

  loadForm() {
    this.formInput = [
      {
        segment: 'JOB INFORMATION',
        show: !true,
        question: [
          {
            key: 'patient_id',
            title: 'Patient list',
            flag: 1,
            val: '',
            option: [],
          },
          {
            key: 'company_name',
            hint: '',
            title: 'Company Name',
            flag: 0,
            typ: 'text',
            val: '',
          },
          {
            key: 'company_address1',
            hint: '',
            title: 'Company Address',
            flag: 0,
            typ: 'text',
            val: '',
          },
          {
            key: 'company_address2',
            hint: '',
            title: 'Company Address 2',
            flag: 0,
            typ: 'text',
            val: '',
          },
          {
            key: 'company_address3',
            hint: '',
            title: 'Company Address 3',
            flag: 0,
            typ: 'text',
            val: '',
          },
          {key: 'state_id', title: 'State', flag: 1, val: '', option: []},
          {
            key: 'city_id',
            title: 'City',
            flag: 1,
            val: '',
            option: [],
            deps: {row: 0, col: 5, match: 'id'},
          },
          {
            key: 'postcode_id',
            title: 'Postcode',
            flag: 1,
            val: '',
            option: [],
            deps: {row: 0, col: 6, match: 'section_name'},
          },
          {
            key: 'supervisor_name',
            hint: '',
            title: 'Supervisor Name',
            flag: 0,
            typ: 'text',
            val: '',
          },
          {
            key: 'email',
            hint: '',
            title: 'Email',
            flag: 0,
            typ: 'text',
            val: '',
          },
          {
            key: 'position',
            hint: '',
            title: 'Position',
            flag: 0,
            typ: 'text',
            val: '',
          },
          {
            key: 'client_name',
            hint: '',
            title: 'Client name',
            flag: 0,
            typ: 'text',
            val: '',
          },
          {
            key: 'job_position',
            hint: '',
            title: 'Job position',
            flag: 0,
            typ: 'text',
            val: '',
          },
          {
            key: 'current_wage',
            title: 'Current wage',
            flag: 1,
            val: '',
            option: [
              {id: 'Per Hour', section_value: 'Per Hour'},
              {id: 'Per Day', section_value: 'Per Day'},
              {id: 'Per Month', section_value: 'Per Month'},
            ],
          },
          {
            key: 'wage_specify',
            hint: ' wage',
            title: null,
            flag: 0,
            typ: 'text',
            val: '',
          },
          {
            key: 'wage_change_occur',
            hint: '',
            title: 'Did a wage change occur for the last 3-6 months ?',
            flag: 10,
            typ: 'radio',
            val: '',
            option: [
              {id: 'yes', value: 'yes'},
              {id: 'No', value: 'No'},
            ],
            subQus: [
              {
                key: 'change_in_rate',
                title: 'Change In Rate',
                flag: 1,
                val: '',
                option: [
                  {id: 'Per Hour', section_value: 'Per Hour'},
                  {id: 'Per Day', section_value: 'Per Hour'},
                  {id: 'Per Month', section_value: 'Per Hour'},
                ],
              },
              {
                key: 'from',
                hint: '',
                title: 'From',
                flag: 0,
                typ: 'text',
                val: '',
              },
              {key: 'to', hint: '', title: 'To', flag: 0, typ: 'text', val: ''},
              {
                key: 'on_date',
                hint: '',
                title: 'On Date',
                flag: 0,
                typ: 'text',
                val: '',
              },
              {
                key: 'works_hour_week',
                hint: '',
                title: 'Work Hours In A Week',
                flag: 0,
                typ: 'text',
                val: '',
              },
              {
                key: 'work_schedule',
                hint: '',
                title: 'Work Schedule',
                flag: 0,
                typ: 'text',
                val: '',
              },
              {
                key: 'no_of_current_employee',
                hint: '',
                title: 'No Of Current Employee In Company',
                flag: 0,
                typ: 'text',
                val: '',
              },
              {
                key: 'no_of_other_employee',
                hint: '',
                title: 'No Of Other Employees In This Position',
                flag: 0,
                typ: 'text',
                val: '',
              },
              {
                key: 'during_same_shift',
                hint: '',
                title: 'During Same Shift',
                flag: 0,
                typ: 'text',
                val: '',
              },
            ],
          },
          {
            key: 'education_level',
            hint: 'Education level',
            title: 'Education',
            flag: 0,
            typ: 'text',
            val: '',
          },
          {
            key: 'grade',
            hint: ' Grade',
            title: null,
            flag: 0,
            typ: 'text',
            val: '',
          },
          {
            key: 'job_experience_year',
            hint: 'Year',
            title: 'Job experience (minimum duration of work) ',
            flag: 0,
            typ: 'text',
            val: '',
          },
          {
            key: 'job_experience_months',
            hint: ' Month',
            title: null,
            flag: 0,
            typ: 'text',
            val: '',
          },
          {
            key: 'others',
            hint: '',
            title: 'Others',
            flag: 4,
            typ: 'text',
            line: 4,
            val: '',
          },
        ],
      },
      {
        segment: 'JOB DESCRIPTION',
        show: false,
        replicate: true,
        count: 1,
        question: [
          //jobs
          {
            key: 'task_description',
            hint: '',
            title: 'Task description ( What ? )',
            flag: 0,
            typ: 'text',
            val: [''],
          },
          {
            key: 'objectives',
            hint: '',
            title: 'Objective ( Why ? )',
            flag: 0,
            typ: 'text',
            val: [''],
          },
          {
            key: 'procedure',
            hint: '',
            title: 'Procedure',
            flag: 0,
            typ: 'text',
            val: [''],
          },
          {
            key: 'rate_of_time',
            hint: '',
            title: '% Time (rate of time)',
            flag: 0,
            typ: 'text',
            val: [''],
          },
        ],
      },
      {
        segment: 'JOB SPECIFICATION',
        flag: true,
        show: false,
        question: [
          //job_specification
          {
            grp: '1',
            key: 'questions',
            hint: '',
            title: '1. WORK SCHEDULE',
            text: 'A. Need to work on weekend',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '1',
            key: '',
            hint: '',
            title: null,
            text: 'B. Night shift only ?',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '1',
            key: '',
            hint: '',
            title: null,
            text: 'C. Part-time',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '1',
            key: '',
            hint: '',
            title: null,
            text: 'D. Full time ? ',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '1',
            key: 'comments',
            hint: '',
            text: '',
            title: '',
            stext: 'Comment',
            flag: 4,
            typ: 'text',
            line: 4,
            val: '',
          },

          {
            grp: '2',
            key: '',
            hint: '',
            title: '2. TRANSPORT TO WORKPLACE',
            text: 'A. Public transport',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '2',
            key: '',
            hint: '',
            title: null,
            text: 'B. Own transport. if yes mention type ?',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '2',
            key: '',
            hint: '',
            title: null,
            text: 'C. Company transport',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '2',
            key: '',
            hint: '',
            text: '',
            title: '',
            stext: 'Comment',
            flag: 4,
            typ: 'text',
            line: 4,
            val: '',
          },

          {
            grp: '3',
            key: '',
            hint: '',
            title: '3. PHYSICAL AND GRADE WEIGHT ABILITIES',
            text: 'A. Limited ( < 5kg )',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '3',
            key: '',
            hint: '',
            title: null,
            text: 'B. Light ( 5 - 10kg )',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '3',
            key: '',
            hint: '',
            title: null,
            text: 'C. Moderate ( 10-20kg )',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '3',
            key: '',
            hint: '',
            title: null,
            text: 'C. Heavy ( >20kg )',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '3',
            key: '',
            hint: '',
            text: '',
            title: '',
            stext: 'Comment',
            flag: 4,
            typ: 'text',
            line: 4,
            val: '',
          },

          {
            grp: '4',
            key: '',
            hint: '',
            title: '4. WORK TOLERANCE',
            text: 'A. Less than 2 hours',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '4',
            key: '',
            hint: '',
            title: null,
            text: 'B. 2-3 hours',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '4',
            key: '',
            hint: '',
            title: null,
            text: 'C. 3-4 hours',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '4',
            key: '',
            hint: '',
            title: null,
            text: 'C. More than 4 hours',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '4',
            key: '',
            hint: '',
            text: '',
            title: '',
            stext: 'Comment',
            flag: 4,
            typ: 'text',
            line: 4,
            val: '',
          },

          {
            grp: '5',
            key: '',
            hint: '',
            title: '5. WORK AREA',
            text: 'A. Small place',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '5',
            key: '',
            hint: '',
            title: null,
            text: 'B. One room',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '5',
            key: '',
            hint: '',
            title: null,
            text: 'C. Few rooms',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '5',
            key: '',
            hint: '',
            title: null,
            text: 'D. Big building',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '5',
            key: '',
            hint: '',
            text: '',
            title: '',
            stext: 'Comment',
            flag: 4,
            typ: 'text',
            line: 4,
            val: '',
          },

          {
            grp: '6',
            key: '',
            hint: '',
            title: '6. WORK SPEED',
            text: 'A. Slow',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '6',
            key: '',
            hint: '',
            title: null,
            text: 'B. Mild',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '6',
            key: '',
            hint: '',
            title: null,
            text: 'C. Moderate',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '6',
            key: '',
            hint: '',
            title: null,
            text: 'D. Fast',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '6',
            key: '',
            hint: '',
            text: '',
            title: '',
            stext: 'Comment',
            flag: 4,
            typ: 'text',
            line: 4,
            val: '',
          },

          {
            grp: '7',
            key: '',
            hint: '',
            title: '7. APPEARANCE',
            text: 'A. Casual',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '7',
            key: '',
            hint: '',
            title: null,
            text: 'B. Clean',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '7',
            key: '',
            hint: '',
            title: null,
            text: 'C. Clean and well kempt',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '7',
            key: '',
            hint: '',
            title: null,
            text: 'D. Well kempt',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '7',
            key: '',
            hint: '',
            text: '',
            title: '',
            stext: 'Comment',
            flag: 4,
            typ: 'text',
            line: 4,
            val: '',
          },

          {
            grp: '8',
            key: '',
            hint: '',
            title: '8. Communication skill',
            text: 'A. Not required/minimal',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '8',
            key: '',
            hint: '',
            title: null,
            text: 'B. When needed',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '8',
            key: '',
            hint: '',
            title: null,
            text: 'C. Average',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '8',
            key: '',
            hint: '',
            title: null,
            text: 'D. Good',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '8',
            key: '',
            hint: '',
            text: '',
            title: '',
            stext: 'Comment',
            flag: 4,
            typ: 'text',
            line: 4,
            val: '',
          },

          {
            grp: '9',
            key: '',
            hint: '',
            title: '9. SOCIAL INTERACTION',
            text: 'A. Not required / minimal',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '9',
            key: '',
            hint: '',
            title: null,
            text: 'B. When needed',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '9',
            key: '',
            hint: '',
            title: null,
            text: 'C. Average',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '9',
            key: '',
            hint: '',
            title: null,
            text: 'D. Good',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '9',
            key: '',
            hint: '',
            text: '',
            title: '',
            stext: 'Comment',
            flag: 4,
            typ: 'text',
            line: 4,
            val: '',
          },

          {
            grp: '10',
            key: '',
            hint: '',
            title: '10. CONCENTRATION',
            text: 'A. Minimal',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '10',
            key: '',
            hint: '',
            title: null,
            text: 'B. Fair',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '10',
            key: '',
            hint: '',
            title: null,
            text: 'C. Average',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '10',
            key: '',
            hint: '',
            title: null,
            text: 'D. Good',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '10',
            key: '',
            hint: '',
            text: '',
            title: '',
            stext: 'Comment',
            flag: 4,
            typ: 'text',
            line: 4,
            val: '',
          },

          {
            grp: '11',
            key: '',
            hint: '',
            title: '11. Work demand',
            text: 'A. One task at a time',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '11',
            key: '',
            hint: '',
            title: null,
            text: 'B. Few task ( 2-3 )',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '11',
            key: '',
            hint: '',
            title: null,
            text: 'C. Average ( 4-6 )',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '11',
            key: '',
            hint: '',
            title: null,
            text: 'D. Many task ( > 7 )',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '11',
            key: '',
            hint: '',
            text: '',
            title: '',
            stext: 'Comment',
            flag: 4,
            typ: 'text',
            line: 4,
            val: '',
          },

          {
            grp: '12',
            key: '',
            hint: '',
            title: '12. MOTIVATION',
            text: 'A. Need encouragement',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '12',
            key: '',
            hint: '',
            title: null,
            text: 'B. Practive',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '12',
            key: '',
            hint: '',
            title: null,
            text: 'C. Good support',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '12',
            key: '',
            hint: '',
            text: '',
            title: '',
            stext: 'Comment',
            flag: 4,
            typ: 'text',
            line: 4,
            val: '',
          },

          {
            grp: '13',
            key: '',
            hint: '',
            title: '13. FLEXIBLILITY IN ROUTINE',
            text: 'A. Frequant ( > 7 ) ',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '13',
            key: '',
            hint: '',
            title: null,
            text: 'B. Average ( 4-6 )',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '13',
            key: '',
            hint: '',
            title: null,
            text: 'C. Minimal ( 2-3 )',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '13',
            key: '',
            hint: '',
            text: '',
            title: '',
            stext: 'Comment',
            flag: 4,
            typ: 'text',
            line: 4,
            val: '',
          },

          {
            grp: '14',
            key: '',
            hint: '',
            title: '14. ABILITY TO READ',
            text: 'A. Not required',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '14',
            key: '',
            hint: '',
            title: null,
            text: 'B. Recognize symbol',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '14',
            key: '',
            hint: '',
            title: null,
            text: 'C. Simple word',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '14',
            key: '',
            hint: '',
            title: null,
            text: 'D. Read fluently',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '14',
            key: '',
            hint: '',
            text: '',
            title: '',
            stext: 'Comment',
            flag: 4,
            typ: 'text',
            line: 4,
            val: '',
          },

          {
            grp: '15',
            key: '',
            hint: '',
            title: '15. ABILITY TO CALCULATE',
            text: 'A. Not required',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '15',
            key: '',
            hint: '',
            title: null,
            text: 'B. Use calculator',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '15',
            key: '',
            hint: '',
            title: null,
            text: 'C. Simple math without calculator',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '15',
            key: '',
            hint: '',
            title: null,
            text: 'D. Difficult maths',
            flag: 6,
            typ: 'radio',
            val: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '15',
            key: '',
            hint: '',
            text: '',
            title: '',
            stext: 'Comment',
            flag: 4,
            typ: 'text',
            line: 4,
            val: '',
          },

          {
            grp: '16',
            key: '',
            hint: '',
            title: '16. Benefits',
            text: '0 = Nil',
            flag: 7,
            typ: 'radio',
            val: '',
            val2: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '16',
            key: '',
            hint: '',
            title: null,
            text: '16 = MC',
            flag: 7,
            typ: 'radio',
            val: '',
            val2: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '16',
            key: '',
            hint: '',
            title: null,
            text: '2 = Medical benefit',
            flag: 7,
            typ: 'radio',
            val: '',
            val2: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '16',
            key: '',
            hint: '',
            title: null,
            text: '3 = Annual Leave',
            flag: 7,
            typ: 'radio',
            val: '',
            val2: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '16',
            key: '',
            hint: '',
            title: null,
            text: '4 = Dental benefit',
            flag: 7,
            typ: 'radio',
            val: '',
            val2: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '16',
            key: '',
            hint: '',
            title: null,
            text: '5 = Discount for employee ',
            flag: 7,
            typ: 'radio',
            val: '',
            val2: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '16',
            key: '',
            hint: '',
            title: null,
            text: '6 = Free food',
            flag: 7,
            typ: 'radio',
            val: '',
            val2: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
          {
            grp: '16',
            key: '',
            hint: '',
            title: null,
            text: '7 = Others ( to specify ) ',
            flag: 7,
            typ: 'radio',
            val: '',
            val2: '',
            option: [{id: 'Yes', value: 'Yes'}],
          },
        ],
      },
      {
        segment: 'OCCASION OF SERVICES',
        show: false,
        question: [
          {
            key: 'location_services',
            title: 'Location of services',
            flag: 1,
            val: '',
            option: [],
          },
          {
            key: 'type_diagnosis_id',
            title: 'Type of diagnosis',
            flag: 1,
            val: '',
            option: [],
          },
          {
            key: 'category_services',
            title: 'Category of services',
            flag: 9,
            val: 'assisstance',
            option: [
              {id: 'assisstance', section_value: 'Assistant/supervision'},
              {id: 'clinical', section_value: 'Clinical work'},
              {id: 'external', section_value: 'External'},
            ],
            onchange: {i: 0, j: 0, api: ''},
            otherValues: {
              sel_val: '',
              code_id: 0,
              sub_code_id: 0,
              services_id: 0,
            },
            otherData: {icd9: [], icd10: [], external: [], assistance: []},
          },
          {
            key: 'complexity_services',
            title: 'Complexity of services',
            flag: 1,
            val: '',
            option: [],
          },
          {key: 'outcome', title: 'Outcome', flag: 1, val: '', option: []},
        ],
      },
      {
        segment: 'MEDICATION',
        show: false,
        question: [
          {
            key: 'medication_des',
            hint: '',
            title: 'Comments',
            flag: 4,
            typ: 'text',
            line: 4,
            val: '',
          },
        ],
      },
    ];
  }

  submitData() {
    debugger;
    const {submitWorkData, user} = this.context;
    var SEND = {};
    var flag = true;
    var errors = '';
    // console.log('>>Ram',JSON.stringify(this.formInput));
    // return;
    this.formInput.forEach(e => {
      if (e.flag) {
        // console.log(e.question);
        // var arr = [];
        // let pgrp = '0';
        // var arrObj = {};
        // var ob = e.question;
        // ob.forEach((obj1, ind1) => {
        //   if (obj1.grp != pgrp) {
        //     pgrp = obj1.grp;
        //     if (arrObj.questions) {
        //       arr.push(arrObj);
        //       arrObj = {};
        //     }
        //     arrObj.questions = obj1.title;
        //     if (obj1.flag == 4) {
        //       arrObj.comments = obj1.val;
        //       arrObj.answer = '';
        //     } else {
        //       arrObj.answer = obj1.val == 'Yes' ? obj1.text : '';
        //       arrObj.comments = '';
        //     }
        //   } else {
        //     if (obj1.flag == 4) {
        //       arrObj.comments = arrObj.comments + ',' + obj1.val;
        //     } else {
        //       if (obj1.val == 'Yes') {
        //         arrObj.answer = arrObj.answer + ',' + obj1.text;
        //       }
        //     }
        //   }
        // });
        // var tmpArr = {};
        // e.question.forEach((obj1, ind1) => {
        //   if (obj1.val == 'Yes' || ( obj1.title != null && obj1.title.length > 1 )){
        //     if (tmpArr[obj1.grp] && tmpArr[obj1.grp].questions){
        //       tmpArr[obj1.grp].answer.push(obj1.text);
        //       if (obj1.flag == 4)
        //           {tmpArr[obj1.grp].comments.push(obj1.val);}
        //       if (obj1.flag == 7)
        //           {tmpArr[obj1.grp].comments.push(obj1.val2);}
        //     } else {
        //       tmpArr[obj1.grp] = {'questions':obj1.title,'answer':[obj1.text],'comments':[obj1.val]};
        //     }
        //   }
        // });
        // SEND.job_specification = Object.values(tmpArr).map(e=>{
        //   return {'questions':e.questions,'answer':e.answer.join(','),'comments':e.comments.length <= 1 ? e.comments[0] : e.comments.join(',')};
        // });
        var tmpArr = {};
        e.question.forEach((obj1, ind1)=>{
          if (obj1.val != '' || ( obj1.title != null && obj1.title.length > 1 )){
            if (!(tmpArr[obj1.grp] && tmpArr[obj1.grp].questions)){
                tmpArr[obj1.grp] = {'questions':obj1.title , 'answer':[] , 'comments':[]};
            }
            if (obj1.flag == 4)
              {tmpArr[obj1.grp].comments.push(obj1.val);}
            else if (obj1.flag == 7)
              {tmpArr[obj1.grp].comments.push(obj1.val2);}
              if (obj1.val == 'Yes'){
                tmpArr[obj1.grp].answer.push(obj1.text);
             }

          }
        });


        SEND.job_specification = Object.values(tmpArr).map(e=>{ return {'questions':e.questions,'answer':e.answer.join(','),'comments': (e.comments.length == 0) ? '' : (e.comments.length <= 1 ? e.comments[0] : e.comments.join(','))}; });
        console.log('###', SEND.job_specification);
        return;
      } else if (e.replicate) {
        console.log(e);
        var arr = [];
        for (let ii = 0; ii < e.question[0].val.length; ii++) {
          var tmp = {};
          tmp[e.question[0].key] = e.question[0].val[ii];
          tmp[e.question[1].key] = e.question[1].val[ii];
          tmp[e.question[2].key] = e.question[2].val[ii];
          tmp[e.question[3].key] = e.question[3].val[ii];
          arr.push(tmp);
        }

        SEND.jobs = arr;
      } else {
        e.question.forEach(f => {
          if (f.flag == 9) {
            if (f.val == 'clinical') {
              SEND.code_id = f.otherValues.code_id;
              SEND.sub_code_id = f.otherValues.sub_code_id;
              SEND.services_id = '';
            } else {
              SEND.services_id = f.otherValues.service_id;
              SEND.code_id = '';
              SEND.sub_code_id = '';
            }
            // SEND.code_id = f.otherValues.code_id;
            // SEND.sub_code_id = f.otherValues.sub_code_id;
            // SEND.services_id = f.otherValues.services_id;
          }
          if (f.flag == 10) {
            console.log(f);
            if (f.val == 'yes') {
              SEND[f.key] = f.val;
              f.subQus.forEach(ff => {
                SEND[ff.key] = ff.val;
              });
            }
          } else if (f.key != null && f.key != '') {
            SEND[f.key] = f.val;
          }
          if (!f.val || f.val == '') {
            errors += f.title + ' is required \n';
            flag = false;
          }
        });
      }
    });
    SEND.status = 0;
    SEND.added_by = user.user.id;
    SEND.patient_id = SEND.patient_id;
    console.log('Sending >> ', SEND);

    if (flag) {
      console.log('can send data');
      submitWorkData(SEND)
        .then(r => {
          console.log(r);
          if (r.status) {
            Http._toast('Form has been submittted');
            // this.formInput.forEach((e,i)=>{
            //   if(e && e.question){
            //     e.question.forEach((f,j)=>{
            //       this.formInput[i]['question'][j]['val']='';
            //     });
            //   }
            // });
            this.loadForm();
            this.setState({});
          }
        })
        .catch(e => {
          Http._toast('Please try again');
          console.log(e);
        });
    } else {
      Http._toast(errors);
      console.log('Flag >> ', errors);
    }
  }

  componentDidMount() {
    NetInfo.fetch().then(state => {
      if (true) {
        [
          [
            'general-setting/list?section=location-of-services',
            3,
            0,
            'id',
            'section_value',
          ],
          ['diagnosis/getIcd10codeList2', 3, 1, 'id', 'section_value'],
          [
            'general-setting/list?section=complexity-of-service',
            3,
            3,
            'id',
            'section_value',
          ],
          ['general-setting/list?section=outcome', 3, 4, 'id', 'section_value'],

          ['address/list', 0, 5, 'id', 'state_name'],
          ['address/getAllCityList', 0, 6, 'post_id', 'city_name', 'id'],
          ['address/stateWisePostcodeList_', 0, 7, 'id', 'postcode', 'id'],
          // ['address/list',0,5,'id','state_name'],
          // ['address/stateWisePostcodeList_',0,6,'id','city_name'],
          // ['address/stateWisePostcodeList_',0,7,'id','postcode'],
        ].forEach(dd => {
          if (state.isConnected) {
            Http.GET(dd[0])
              .then(r => {
                this.formInput[dd[1]].question[dd[2]].option = [];
                if (r.code == 200) {
                  this.formInput[dd[1]].question[dd[2]].option = r.list.map(
                    e => {
                      var tmp = {id: e[dd['3']], section_value: e[dd['4']]};
                      if (dd['5'] != null && dd['5'] != undefined) {
                        tmp.deps = e[dd['5']];
                      }
                      return tmp;
                    },
                  );
                  AsyncStorage.setItem(
                    dd[0],
                    JSON.stringify(
                      this.formInput[dd[1]].question[dd[2]].option,
                    ),
                  );
                  this.setState({});

                  // console.log(dd[1],dd[2],this.formInput[dd[1]].question[dd[2]].title, '++ ',this.formInput[dd[1]].question[dd[2]].option);
                } else {
                  Http._toast(
                    this.formInput[dd[1]].question[dd[2]].title +
                      ' has not been loaded',
                  );
                }
              })
              .catch(e => {
                console.log(e);
                Http._toast(
                  this.formInput[dd[1]].question[dd[2]].title +
                    ' has not been loaded',
                );
              });
          } else {
            AsyncStorage.getItem(dd[0]).then(r => {
              console.log(r);
              if (r) {
                this.formInput[dd[1]].question[dd[2]].option = JSON.parse(r);
                this.setState({});
              }
            });
          }
        });
        [
          [
            'general-setting/list?section=external',
            'external',
            'id',
            'section_value',
          ],
          [
            'general-setting/list?section=assistance-or-supervision',
            'assistance',
            'id',
            'section_value',
          ],
          // ['diagnosis/getIcd10codeList2','icd9','id','section_value'],
          // ['diagnosis/getIcd9subcodeList_','icd10','id','section_value'],
          ['diagnosis/getIcd9codeList', 'icd9', 'id', 'section_value'],
          ['diagnosis/getIcd9subcodeList_', 'icd10', 'id', 'section_value'],
        ].forEach(dd => {
          if (state.isConnected) {
            Http.GET(dd[0])
              .then(r => {
                this.formInput[3].question[2].otherData[dd[1]] = [];
                console.log(r);
                if (r.code == 200) {
                  this.formInput[3].question[2].otherData[dd[1]] = r.list;
                  AsyncStorage.setItem(
                    dd[0],
                    JSON.stringify(
                      this.formInput[3].question[2].otherData[dd[1]],
                    ),
                  );
                  this.setState({});
                } else {
                  Http._toast(
                    this.formInput[3].question[2].title +
                      ' [ ' +
                      dd[1] +
                      ' ] has not been loaded',
                  );
                }
              })
              .catch(e => {
                console.log(e);
                Http._toast(
                  this.formInput[3].question[2].title +
                    ' [ ' +
                    dd[1] +
                    ' ] has not been loaded',
                );
              });
          } else {
            AsyncStorage.getItem(dd[0]).then(r => {
              console.log(r);
              if (r) {
                this.formInput[3].question[2].otherData[dd[1]] = JSON.parse(r);
                this.setState({});
              }
            });
          }
        });

        if (state.isConnected) {
          const {submitWorkData, user} = this.context;
          Http.GET('patient-registration/getPatientRegistrationListMobile')
            .then(r => {
              this.formInput[0].question[0].option = [];
              console.log('data work>>>>>', r);
              if (r.code == 200) {
                this.formInput[0].question[0].option = r.list
                  .map(e => {
                    return {
                      id: e.id,
                      section_value: e.patient_mrn + ' - ' + e.section_value,
                      branch_id: e.branch_id,
                    };
                  })
                  .filter(rr => rr.branch_id == user.branch.branch_id);
                AsyncStorage.setItem(
                  'patient-registration/getPatientRegistrationListMobile',
                  JSON.stringify(r.list),
                );
                this.setState({});
              } else {
                Http._toast(' Patient data has not been loaded');
              }
            })
            .catch(e => {
              console.log(e);
              Http._toast(' Patient data has not been loaded');
            });
        } else {
          const {submitWorkData, user} = this.context;
          AsyncStorage.getItem(
            'patient-registration/getPatientRegistrationListMobile',
          ).then(r => {
            console.log(r);
            if (r) {
              this.formInput[0].question[0].option = JSON.parse(r).filter(
                rr => rr.branch_id == user.branch.branch_id,
              );
              this.setState({});
            }
          });
        }
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{marginVertical: 20, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              const {navigation} = this.props;
              navigation.pop();
            }}>
            <Icon name="chevron-back-outline" style={{}} size={30} />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              flex: 1,
              fontWeight: 'bold',
              fontSize: 20,
              color: 'gray',
            }}>
            Work Analysis Form
          </Text>
        </View>
        <ScrollView>
          {this.formInput.map((e, i) => {
            return (
              <View style={{margin: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    this.formInput[i].show = !this.formInput[i].show;
                    this.setState({});
                  }}
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    backgroundColor: 'gray',
                    borderRadius: 10,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      flex: 1,
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    {e.segment}
                  </Text>
                  <Icon
                    name={e.show ? 'remove-outline' : 'add-outline'}
                    style={{color: 'white'}}
                    size={25}
                  />
                </TouchableOpacity>
                {!e.replicate && e.show ? (
                  e.question.map((f, j) => {
                    return (
                      <View
                        style={{
                          marginTop: f.title ? 10 : 3,
                          marginHorizontal: 5,
                        }}>
                        {f.title ? (
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: 'bold',
                              color: 'gray',
                              marginBottom: 2,
                            }}>
                            {i} : {j} - {f.title}
                          </Text>
                        ) : null}
                        {f.stext ? <Text style={{}}>{f.stext}</Text> : null}
                        {f.flag == 0 ? (
                          <FormInput
                            title={f.hint != '' ? f.hint : f.title}
                            value={f.val}
                            action={txt => {
                              this.formInput[i].question[j].val = txt;
                              this.setState({});
                            }}
                          />
                        ) : f.flag == 1 ? (
                          <FormDropdown
                            option={
                              f.deps != undefined &&
                              f.deps != null &&
                              f.deps.col
                                ? f.option.filter(
                                    ee =>
                                      this.formInput[f.deps.row].question[
                                        f.deps.col
                                      ].val == ee.deps,
                                  )
                                : f.option
                            }
                            value={f.val}
                            action={item => {
                              console.log(item);
                              if (i == 0 && j == 0) {
                                this.formInput[0].question[1].val =
                                  item.patient_mrn ? item.patient_mrn : item.id;
                                // this.formInput[0].question[11].val = item.patient_mrn?item.patient_mrn: item.id;
                                this.formInput[0].question[11].val =
                                  item.section_value.split('-')[1];
                              }
                              this.formInput[i].question[j].val = item.id;
                              this.setState({});
                            }}
                          />
                        ) : f.flag == 2 ? (
                          <TouchableOpacity
                            onPress={() => {
                              console.log(this.formInput[i].question[j]);
                              this.formInput[i].question[j].open = true;
                              this.setState({});
                            }}
                            style={{
                              zIndex: 99999,
                              borderWidth: 1,
                              borderColor: 'gray',
                              borderRadius: 10,
                              padding: 15,
                            }}>
                            <Text style={{color: 'gray'}}>
                              {' '}
                              {this.formInput[i].question[j].val == ''
                                ? 'Select' + f.title
                                : this.formInput[i].question[j].val}{' '}
                            </Text>
                            <DatePicker
                              modal
                              mode={f.typ}
                              open={f.open}
                              date={new Date()}
                              onConfirm={date => {
                                this.formInput[i].question[j].val =
                                  f.typ == 'date'
                                    ? `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
                                    : `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                                this.formInput[i].question[j].open = false;
                                this.setState({});
                              }}
                              onCancel={() => {
                                this.formInput[i].question[j].open = false;
                                this.setState({});
                              }}
                            />
                          </TouchableOpacity>
                        ) : f.flag == 3 ? (
                          <View
                            style={{flexDirection: 'row', marginVertical: 5}}>
                            {f.option.map((obj, k) => {
                              return (
                                <TouchableOpacity
                                  onPress={() => {
                                    console.log(obj);
                                    this.formInput[i].question[j].val =
                                      obj.value;
                                    this.setState({});
                                  }}
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    marginRight: 10,
                                    padding: 10,
                                    borderRadius: 10,
                                  }}>
                                  <Icon
                                    size={18}
                                    name={
                                      this.formInput[i].question[j].val ==
                                      obj.value
                                        ? 'radio-button-on-outline'
                                        : 'radio-button-off-outline'
                                    }
                                  />
                                  <Text style={{color: 'gray'}}>
                                    {obj.value}
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        ) : f.flag == 4 ? (
                          <FormTextArea
                            line={f.line}
                            value={f.val}
                            action={txt => {
                              this.formInput[i].question[j].val = txt;
                              this.setState({});
                            }}
                          />
                        ) : f.flag == 5 ? (
                          <Text
                            style={{
                              flex: 1,
                              color: 'gray',
                              fontWeight: 'bold',
                              fontSize: 20,
                            }}>
                            {f.head}
                          </Text>
                        ) : f.flag == 6 ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              marginVertical: 5,
                              alignItems: 'center',
                            }}>
                            <Text style={{flex: 1}}>{f.text}</Text>
                            {f.option.map((obj, k) => {
                              return (
                                <TouchableOpacity
                                  onPress={() => {
                                    console.log(obj);
                                    console.log(
                                      obj,
                                      this.formInput[i].question[j],
                                    );
                                    if (
                                      this.formInput[i].question[j].val !=
                                      obj.value
                                    ) {
                                      this.formInput[i].question[j].val =
                                        obj.value;
                                    } else {
                                      this.formInput[i].question[j].val = 'No';
                                    }
                                    this.setState({});
                                  }}
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    marginRight: 10,
                                    padding: 10,
                                    borderRadius: 10,
                                  }}>
                                  <Icon
                                    size={18}
                                    name={
                                      this.formInput[i].question[j].val ==
                                      obj.value
                                        ? 'radio-button-on-outline'
                                        : 'radio-button-off-outline'
                                    }
                                  />
                                  <Text style={{color: 'gray'}}>
                                    {obj.value}
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        ) : f.flag == 7 ? (
                          <View style={{marginVertical: 5}}>
                            <Text style={{flex: 1}}>{f.text}</Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              {f.option.map((obj, k) => {
                                return (
                                  <TouchableOpacity
                                    onPress={() => {
                                      console.log(obj);
                                      console.log(
                                        obj,
                                        this.formInput[i].question[j],
                                      );
                                      this.formInput[i].question[j].val =
                                        obj.value;
                                      this.setState({});
                                    }}
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      backgroundColor: 'white',
                                      marginRight: 10,
                                      padding: 14,
                                      borderRadius: 10,
                                    }}>
                                    <Icon
                                      size={18}
                                      name={
                                        this.formInput[i].question[j].val ==
                                        obj.value
                                          ? 'radio-button-on-outline'
                                          : 'radio-button-off-outline'
                                      }
                                    />
                                    <Text style={{color: 'gray'}}>
                                      {obj.value}
                                    </Text>
                                  </TouchableOpacity>
                                );
                              })}
                              <FormInput
                                title={'comment'}
                                value={f.val2}
                                action={txt => {
                                  this.formInput[i].question[j].val2 = txt;
                                  this.setState({});
                                }}
                              />
                            </View>
                          </View>
                        ) : f.flag == 9 ? (
                          <View>
                            <View
                              style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                              {f.option.map((obj, k) => {
                                return (
                                  <FormRadioButton
                                    icon={
                                      this.formInput[i].question[j].val ==
                                      obj.id
                                        ? 'radio-button-on-outline'
                                        : 'radio-button-off-outline'
                                    }
                                    action={() => {
                                      console.log(obj.id);
                                      this.formInput[i].question[j].val =
                                        obj.id;
                                      this.setState({});
                                    }}
                                    text={obj.section_value}
                                  />
                                );
                              })}
                            </View>
                            {
                              //otherValues:{code_id:0,sub_code_id:0}, otherData:{icd9:[],icd10:[]} :
                              this.formInput[i].question[j].val ==
                              'clinical' ? (
                                <View
                                  style={{flexDirection: 'row', marginTop: 10}}>
                                  <View style={{flex: 1}}>
                                    <Text style={{fontWeight: 'bold'}}>
                                      ICD 9 code
                                    </Text>
                                    <FormDropdown
                                      option={f.otherData.icd9}
                                      value={f.otherValues.code_id}
                                      action={item => {
                                        this.formInput[i].question[
                                          j
                                        ].otherValues.sel_val =
                                          item.icd_category_code;
                                        this.formInput[i].question[
                                          j
                                        ].otherValues.code_id = item.id;
                                        this.setState({});
                                      }}
                                    />
                                  </View>
                                  <View style={{flex: 1, marginLeft: 5}}>
                                    <Text style={{fontWeight: 'bold'}}>
                                      ICD 9 sub code
                                    </Text>
                                    <FormDropdown
                                      option={f.otherData.icd10.filter(
                                        ee =>
                                          f.otherValues.sel_val ==
                                          ee.icd_category_code,
                                      )}
                                      value={f.otherValues.sub_code_id}
                                      action={item => {
                                        this.formInput[i].question[
                                          j
                                        ].otherValues.sub_code_id = item.id;
                                      }}
                                    />
                                  </View>
                                </View>
                              ) : this.formInput[i].question[j].val ==
                                'assisstance' ? (
                                <View style={{marginTop: 10}}>
                                  <Text style={{fontWeight: 'bold'}}>
                                    Services
                                  </Text>
                                  <FormDropdown
                                    option={f.otherData.assistance}
                                    value={f.otherValues.services_id}
                                    action={item => {
                                      this.formInput[i].question[
                                        j
                                      ].otherValues.service_id = item.id;
                                    }}
                                  />
                                </View>
                              ) : (
                                <View style={{marginTop: 10}}>
                                  <Text style={{fontWeight: 'bold'}}>
                                    Services
                                  </Text>
                                  <FormDropdown
                                    option={f.otherData.external}
                                    value={f.otherValues.services_id}
                                    action={item => {
                                      this.formInput[i].question[
                                        j
                                      ].otherValues.service_id = item.id;
                                    }}
                                  />
                                </View>
                              )
                            }
                          </View>
                        ) : f.flag == 10 ? (
                          <View>
                            <View
                              style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                              {f.option.map((obj, k) => {
                                return (
                                  <FormRadioButton
                                    icon={
                                      this.formInput[i].question[j].val ==
                                      obj.id
                                        ? 'radio-button-on-outline'
                                        : 'radio-button-off-outline'
                                    }
                                    action={() => {
                                      console.log(obj.id);
                                      this.formInput[i].question[j].val =
                                        obj.id;
                                      this.setState({});
                                    }}
                                    text={obj.value}
                                  />
                                );
                              })}
                            </View>
                            {this.formInput[i].question[j].val == 'yes' ? (
                              <View
                                style={{
                                  flexDirection: 'column',
                                  marginTop: 10,
                                }}>
                                {this.formInput[i].question[j].subQus.map(
                                  (sq, sqi) => (
                                    <View>
                                      <Text
                                        style={{
                                          fontSize: 15,
                                          fontWeight: 'bold',
                                          color: 'gray',
                                          marginBottom: 2,
                                        }}>
                                        {i} : {j} : {sqi} - {sq.title}
                                      </Text>

                                      {sq.flag == 1 ? (
                                        <FormDropdown
                                          option={sq.option}
                                          value={sq.val}
                                          action={item => {
                                            this.formInput[i].question[
                                              j
                                            ].subQus[sqi].val = item.id;
                                            this.setState({});
                                          }}
                                        />
                                      ) : (
                                        <FormInput
                                          title={
                                            sq.hint != '' ? sq.hint : sq.title
                                          }
                                          value={sq.val}
                                          action={txt => {
                                            this.formInput[i].question[
                                              j
                                            ].subQus[sqi].val = txt;
                                            this.setState({});
                                          }}
                                        />
                                      )}
                                    </View>
                                  ),
                                )}
                              </View>
                            ) : null}
                          </View>
                        ) : null}
                      </View>
                    );
                  })
                ) : e.replicate && e.show ? (
                  <View>
                    {e.question[0].val.map((ll, kk) => {
                      return (
                        <View
                          style={{
                            shadowColor: 'red',
                            shadowRadius: 10,
                            shadowOffset: 10,
                            elevation: 5,
                            backgroundColor: 'white',
                            padding: 10,
                            borderRadius: 10,
                            marginVertical: 10,
                          }}>
                          <Text>{e.question[0].title}</Text>
                          <FormInput
                            title={''}
                            value={e.question[0].val[kk]}
                            action={txt => {
                              e.question[0].val[kk] = txt;
                              this.setState({});
                            }}
                          />

                          <Text>{e.question[1].title}</Text>
                          <FormInput
                            title={''}
                            value={e.question[1].val[kk]}
                            action={txt => {
                              e.question[1].val[kk] = txt;
                              this.setState({});
                            }}
                          />

                          <Text>{e.question[2].title}</Text>
                          <FormInput
                            title={''}
                            value={e.question[2].val[kk]}
                            action={txt => {
                              e.question[2].val[kk] = txt;
                              this.setState({});
                            }}
                          />

                          <Text>{e.question[3].title}</Text>
                          <FormInput
                            title={''}
                            value={e.question[3].val[kk]}
                            action={txt => {
                              e.question[3].val[kk] = txt;
                              this.setState({});
                            }}
                          />

                          <TouchableOpacity
                            onPress={() => {
                              e.question[0].val.splice(kk, 1);
                              e.question[1].val.splice(kk, 1);
                              e.question[2].val.splice(kk, 1);
                              e.question[3].val.splice(kk, 1);
                              this.setState({});
                            }}
                            style={{
                              backgroundColor: 'red',
                              borderRadius: 10,
                              marginTop: 10,
                              paddingVertical: 10,
                            }}>
                            <Text
                              style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: 'white',
                              }}>
                              Remove
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                    <TouchableOpacity
                      onPress={() => {
                        e.question[0].val.push('');
                        e.question[1].val.push('');
                        e.question[2].val.push('');
                        e.question[3].val.push('');
                        this.setState({});
                      }}
                      style={{
                        backgroundColor: 'orange',
                        borderRadius: 10,
                        marginTop: 10,
                        paddingVertical: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          color: 'white',
                        }}>
                        Add more
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            );
          })}

          <TouchableOpacity
            style={{
              backgroundColor: 'darkblue',
              borderRadius: 10,
              padding: 10,
              margin: 10,
            }}
            onPress={() => {
              this.submitData();
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
