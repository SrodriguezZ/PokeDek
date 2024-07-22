import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export const useDebouncendValue = (input:string = '', ms:number =  500) => {
    const [debouncedValue, setdebouncedValue] = useState(input)
    useEffect(()=> {
        //creamos con tiempo para cuando se da ese tiempo podamos poder guardar el valor nuevo 
        const timeout = setTimeout(()=> {
            setdebouncedValue(input)
        },ms)
        //Creamos un return por si el usuario vuelve escribir y ese active el input salga por el return 
        return () => {
            clearTimeout(timeout)
        }
    },[input])

    return debouncedValue
    
};
