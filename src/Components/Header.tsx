import {SortableKeys} from "../Utils/Api";
import {searchByType} from "../App";

interface HeaderProps {
    setSearchBy: (searchBy: searchByType) => void;
    setSearchTerm: (searchTerm: string) => void;
    setSortKey: (sortKey: SortableKeys) => void;
    setSortOrder: (sortOrder: 'asc' | 'desc') => void;
}

export const Header = ({setSearchBy, setSearchTerm, setSortOrder, setSortKey}: HeaderProps) => {
    return (
        <div className={"header"}>
            <div className={"custom-select"}>
                <select onChange={(e) => setSearchBy(e.target.value as any)}>
                    <option value={'name.first'}>First Name</option>
                    <option value={'name.last'}>Last Name</option>
                    <option value={'email'}>Email</option>
                </select>
                <input className={"search-input"} type="text" onChange={(e) => setSearchTerm(e.target.value)} placeholder={'Search by'}/>
            </div>

            <div className={"custom-select sort"}>
                <select className={'sortBy'} onChange={(e) => setSortKey(e.target.value as SortableKeys)}>
                    <option value="name.first">Sort by Name</option>
                    <option value="dob.date">Sort by Age</option>
                    <option value={"email"}>Sort by Email</option>
                    <option value={"phone"}>Sort by Phone</option>
                    <option value={"location.street.name"}>Sort by Street</option>
                    <option value="location.city">Sort by City</option>
                    <option value="location.state">Sort by State</option>
                    <option value="location.postcode">Sort by Postal</option>
                    <option value="location.country">Sort by Country</option>
                </select>
                <select onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        </div>
    )
}