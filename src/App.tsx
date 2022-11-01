import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import {Card} from "./Components/Card";
import {getIds, IDCard, SortableKeys} from "./Utils/Api";
import {orderBy, get} from "lodash";
import {Header} from "./Components/Header";

export type searchByType = 'name.first' | 'name.last' | 'email';
function App() {
    // const [idCards, setIdCards] = useReducer((state: IDCard[], action: { type: 'add' | 'update', payload: IDCard | IDCard[] }) => {
    //     switch (action.type) {
    //         case 'add':
    //             return [...state, ...(Array.isArray(action.payload) ? action.payload : [action.payload)];
    //         case 'update':
    //             return state.map((idCard, index) => {
    //                 return idCard;
    //     })
    //     }
    // }, []);
    const [idCards, setIdCards] = useState<IDCard[]>([]);
    const [sortKey, setSortKey] = useState<SortableKeys>('name.first');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [searchBy, setSearchBy] = useState<searchByType>('name.first');
    const [searchTerm, setSearchTerm] = useState<string>('');


    useEffect(() => {
        return () => {
            getIds().then(res => setIdCards(orderBy(res, sortKey, sortOrder)));
            // getIds().then(res => setIdCards({type: 'add', payload: orderBy(res, sortKey, sortOrder)}));
        }
    },[])

    useEffect(() => {
        const sortedCards = orderBy(idCards, sortKey, sortOrder);
        setIdCards(sortedCards);
        // setIdCards({type: 'update', payload: sortedCards});
    }, [sortKey, sortOrder]);


    const updateCard = (uuid: string, key: string, value: string) => {
        const updatedCards = idCards.find(card => card.login.uuid === uuid);
        if (updatedCards) {
            // @ts-ignore
            updatedCards[key] = value;
            setIdCards([...idCards]);
            // setIdCards({type: 'update', payload: idCards});
        }
    }

    return (
        <div className={'container'}>
            <Header
                setSearchBy={setSearchBy}
                setSearchTerm={setSearchTerm}
                setSortKey={setSortKey}
                setSortOrder={setSortOrder}
            />
            <div className="cards">
                {
                    idCards.filter((a => {
                        return get(a, searchBy).toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
                    })).map((idCard) => {
                    return (
                        <Card key={idCard.login.uuid} {...idCard} updateCard={updateCard}/>
                    )
                    }) ?? <div>Loading...</div>
                }
            </div>
        </div>
    );
}

export default App;
