type StorageType = 'local' | 'session'
type SessionPreference = 'hostel_user' | 'user_choices'
type UseStorageReturnValue = {
    getItem: (key:string, type?:StorageType) => string
    setItem: (key:string, value:string | string[], type?:StorageType, sessionKey?:SessionPreference) => boolean
    removeItem: (key: string, type?:StorageType) => void
}

const useStorage = (): UseStorageReturnValue => {
    const getSessionLocalKey = (): string[] => {
        const keys: string[] = [];
        for(let i = 0; i < sessionStorage.length; i++){
            const key = sessionStorage.key(i)
            if(key)
             keys.push(key)
        }
        return keys;
    }

    const isBrowser = ((): boolean => typeof window !== 'undefined')();
    const storageType = (type?:StorageType):'localStorage' | 'sessionStorage' => `${type ?? 'session'}Storage`;

    const getItem = (key:string, type?:StorageType):string =>{
        if(isBrowser){
            const from_local_session = window[storageType(type)].getItem(key)
            if(from_local_session === undefined || from_local_session === null){
                return '0'
            }
            return from_local_session ? from_local_session : '0'
        }
        return '0'
    }

    const setItem = (key: string, value: string | string[], type?:StorageType,sessionKey:SessionPreference = 'user_choices' ):boolean => {
      if(isBrowser){

       if(type === 'session'){
           if(sessionKey === 'hostel_user'){
            const existingData = window[storageType(type)].getItem(sessionKey);
            // console.log("Hostel User", existingData)
            const hostel_user = existingData ? JSON.parse(existingData) : {}
            hostel_user[key] = value
            window[storageType(type)].setItem(sessionKey, JSON.stringify(hostel_user));
            return true;
           }else if(sessionKey === 'user_choices'){
            const existingData = window[storageType(type)].getItem(sessionKey);
            // console.log("User choice", existingData)
            const user_choices = existingData ? JSON.parse(existingData) : {}

            Array.isArray(value) ? user_choices[key] = value : user_choices[key] = [value]
            
            window[storageType(type)].setItem(sessionKey, JSON.stringify(user_choices));
            return true;
           }else{
            return false
           }
       }else{
        Array.isArray(value) ?
        window[storageType(type)].setItem(key, JSON.stringify(value))
        : window[storageType(type)].setItem(key,value)
        return true;
        }
      }else{
          return false
      }
    }

    const removeItem = (key: string, type?: StorageType):void => {
       window[storageType(type)].removeItem(key);
    }
    return{
        getItem,
        setItem,
        removeItem,
    }
}
export default useStorage;