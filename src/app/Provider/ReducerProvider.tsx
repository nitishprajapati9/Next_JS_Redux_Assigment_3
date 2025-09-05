"use client"
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store,peristor } from "../_store/store";

export default function ReducerProvider({children}:{children:React.ReactNode}){
    return(
        <Provider store={store}>
            <PersistGate loading={null} persistor={peristor}>
                {children}
            </PersistGate>
        </Provider>
    )
}