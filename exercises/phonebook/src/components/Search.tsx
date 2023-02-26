interface PropTypes {
    search: string;
    searchOnChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({search, searchOnChangeHandler}: PropTypes) => {
    return (
        <label>
            Filter:
            <input type="text" value={search} onChange={searchOnChangeHandler} />
        </label>
    )
}

export default Search