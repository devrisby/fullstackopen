interface PropTypes {
    search: string;
    searchOnChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({search, searchOnChangeHandler}: PropTypes) => {
    return (
        <label>
            <div>
                <p>Filter:</p>
            </div>
            <div>
                <input type="text" value={search} onChange={searchOnChangeHandler} />
            </div>
        </label>
    )
}

export default Search