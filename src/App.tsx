import React, {useEffect, useState} from 'react';
import './App.css';
import {Card} from "./Components/Card";
import {getIds, IDCard, SortableKeys} from "./Utils/Api";
import {orderBy, get} from "lodash";
import {Header} from "./Components/Header";

export type searchByType = 'name.first' | 'name.last' | 'email';
function App() {
    const [idCards, setIdCards] = useState<IDCard[]>([]);
    const [sortKey, setSortKey] = useState<SortableKeys>('name.first');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [searchBy, setSearchBy] = useState<searchByType>('name.first');
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        return () => {
            getIds().then(res => setIdCards(orderBy(res, sortKey, sortOrder)));
        }
    },[])

    useEffect(() => {
        const sortedCards = orderBy(idCards, sortKey, sortOrder);
        setIdCards(sortedCards);
    }, [sortKey, sortOrder]);


    const updateCard = (uuid: string, key: string, value: string) => {
        const updatedCards = idCards.find(card => card.login.uuid === uuid);
        if (updatedCards) {
            const x = key.split('.').reduce((acc, curr, index, arr) => {
                if (index === arr.length - 1) {
                    // @ts-ignore
                    acc[curr] = value;
                }
                    // @ts-ignore
                    return acc[curr];
            }
            , updatedCards);
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
                        return get(a, searchBy).toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
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
