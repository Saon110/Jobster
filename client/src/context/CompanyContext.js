import React , {useState,createContext} from "react";

export const CompanyContext = createContext();


export const CompanyContextProvider = (props) => {
    const [company, setCompany] = useState([]);

    const addCompany = (comp) => {
        setCompany([...company, comp]);
    }

    return (
        <CompanyContext.Provider value={{company, setCompany,addCompany}}>
            {props.children}
        </CompanyContext.Provider>
    );
}