import React, {useState, useEffect, useRef} from "react";
import {FaSearch} from 'react-icons/fa';
import './SearchBar.css';

export const SearchBar = ({ setResults, setGridResults }) => {
    const [input, setInput] = useState("");
    const abortControllerRef = useRef(null);

    useEffect(() => {
            const delayDebounceFn = setTimeout(() => {
                if (input.trim().length > 2) {
                    fetchData(input);
                } else {
                    setResults([]);
                }
        }, 300); // 300ms is the "sweet spot" for feel
        return () => {clearTimeout(delayDebounceFn)
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };
    }, [input]);

    const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                if (abortControllerRef.current) {
                    abortControllerRef.current.abort();
                }
                const query = encodeURIComponent(`name:"${input}" include:extras`);
                fetch(`https://api.scryfall.com/cards/search?q=${query}`)
                    .then(res => res.json())
                    .then(json => {
                        if (json && json.data) {
                            setGridResults(json.data);
                            setResults([]); // Hide the dropdown
                        }
                    })
                    .catch(err => {
                        if (err.name !== 'AbortError') {
                            console.error("Search error:", err);
                        }
                    });
            }
        };

    const fetchData = (value) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();
        const query = encodeURIComponent(value);
        const url = `https://api.scryfall.com/cards/search?q=${query}&order=name`;

        fetch(url, { signal: abortControllerRef.current.signal })
            .then(response => {
                if (!response.ok) return null;
                return response.json();
            })
            .then((json) => {
                if (json && json.data) {
                    console.log("Cards found:", json.data);
                    setResults(json.data);
                    }
                }) 
            .catch(error => console.error("Network error:", error));
        };

    const handleChange = (value) => {
        setInput(value);
    };

  return <div className="input-wrapper">
    <FaSearch id="search-icon" />
          <input 
          type="text" 
          placeholder="Search for a card..." 
          value={input} 
          onChange={(e) => handleChange(e.target.value)} 
          onKeyDown={handleKeyDown}
          />
        </div>  
};