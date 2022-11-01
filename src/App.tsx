import React, {useEffect, useState} from 'react';
import './App.css';
import {Card} from "./Components/Card";
import {getIds, IDCard, SortableKeys} from "./Utils/Api";
import {orderBy, filter, startsWith, get} from "lodash";
import {Header} from "./Components/Header";

export type searchByType = 'name.first' | 'name.last' | 'email';
function App() {
    const [idCards, setIdCards] = useState<IDCard[]>([]);
    const [sortKey, setSortKey] = useState<SortableKeys>('name.first');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [searchBy, setSearchBy] = useState<searchByType>('name.first');
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        getIds().then(res => setIdCards(orderBy(res, sortKey, sortOrder)));
    },[])

    useEffect(() => {
        const sortedCards = orderBy(idCards, sortKey, sortOrder);
        setIdCards(sortedCards);
    }, [sortKey, sortOrder]);

    const updateCard = (uuid: string, key: string, value: string) => {
        const updatedCards = idCards.find(card => card.login.uuid === uuid);
        if (updatedCards) {
            // @ts-ignore
            updatedCards[key] = value;
            setIdCards([...idCards]);
        }
        // const updatedCards = idCards.map(card => {
        //     if (card.login.uuid === uuid) {
        //         // @ts-ignoredd
        //         card[key] = value;
        //     }
        //     return card;
        // })
        // setIdCards(updatedCards);
    }

    console.log('idCards', idCards);
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
                    filter(idCards, (card) => {

                        // return startsWith(get(card, searchBy).toLocaleLowerCase(), searchTerm.toLocaleLowerCase());
                        return get(card, searchBy).toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
                    }).map((idCard, index) => {
                        console.log('idCard', idCard);
                        return (
                            <Card key={index} {...idCard} updateCard={updateCard}/>
                        )
                    }) ?? <div>Loading...</div>
                }
            </div>
        </div>
    );
}

export default App;
