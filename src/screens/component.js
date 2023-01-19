/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';

export function FormInput({title,value,action}) {
  return (
    <TextInput
      placeholder={'Enter ' + title}
      placeholderTextColor={"black"}
      value={value}
      style={{
        flex:1,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 10,
        color:'black',
        textDecorationColor:'black',
        shadowColor:'black',
        textShadowColor:'black',
        textColor:'black',
        textColor:'#000'
      }}
      onChangeText={action}
    />
  );
}
export function FormDropdown({option,value,action}) {
return <Dropdown
    style={{borderWidth:1,borderColor:'gray',padding:10,borderRadius:10}}
    data={option}
    search
    labelField="section_value"
    valueField="id"
    searchPlaceholder="Search..."
    value={value}
    onChange={action}
/>;
}
export function FormDateTime({text,openClose,type_,open_,onConfirm_,onCancel_}) {
    return <TouchableOpacity
        onPress={openClose}
        style={{zIndex:99999, borderWidth:1,borderColor:'gray',borderRadius:10,padding:15}}
    >
        <Text style={{color:'gray'}}> {text}</Text>
        <DatePicker
            modal
            mode={type_}
            open={open_}
            date={new Date()}
            onConfirm={onConfirm_}
            onCancel={onCancel_}
        />
    </TouchableOpacity>;
}
export function FormTextArea({title,value,action,line}) {
    return <TextInput
        // keyboardType=''
        numberOfLines={line}
        // placeholder={ (f.hint) ? 'Enter ' + f.hint : (f.title) ? 'Enter ' + f.title : ''}
        value={value}
        
        style={{ 
            
            color:'black',
            textDecorationColor:'black',
            shadowColor:'black',
            textShadowColor:'black',
            textColor:'black',
            textColor:'#000',
            borderWidth:1,borderColor:'gray',padding:10,borderRadius:10,placeholderTextColor:'black'}}
        onChangeText={action}
    />;
}
export function FormRadioButton({icon,action,text}) {
    return <TouchableOpacity
            onPress={action}
            style={{
                flexDirection:'row',
                alignItems:'center',
                backgroundColor:'white',
                marginRight:10,
                marginTop:10,
                padding:10,
                borderRadius:10,
                }}>
            <Icon size={18} name={icon}  />
            <Text style={{color:'gray'}}>{text}</Text>
        </TouchableOpacity>;
}
