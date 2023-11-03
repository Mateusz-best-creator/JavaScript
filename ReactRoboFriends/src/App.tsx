import React, {useState, useEffect, ChangeEvent} from 'react';
import CardList from './components/CardList';
import SearchBox from './components/SearchBox';

import { getData } from './utils/fetch-data';

export type Robots = {
  id: string;
  name: string;
  email: string;
}

const App = () => {

  const [robots, setRobots] = useState<Array<Robots>>([]);
  const [searchField, setSearchField] = useState('');
  const [filteredArray, setFilteredArray] = useState([robots]);

  useEffect(() => {
    const fetchRobots = async () => {
      const robotsData = await getData<Array<Robots>>('https://jsonplaceholder.typicode.com/users');
      setRobots(robotsData);
    }
    fetchRobots();
  }, [])

  useEffect(() => {
    const filteredArray = robots.filter((item) => {
      return item.name.toLowerCase().includes(searchField.toLowerCase());
    })
    setFilteredArray(filteredArray);
  }, [robots, searchField])

  const onChangeField = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchField(event.target.value);
  }

  return (
    <div>
      <SearchBox onChangeFunction={onChangeField} />
      <CardList arrayOfRobots={filteredArray} />
    </div>
  )
}

export default App;