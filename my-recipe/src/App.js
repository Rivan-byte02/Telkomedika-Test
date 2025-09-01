import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [recipes, setRecipes] = useState([]);
  let [currentIndex, setCurrentIndex] = useState(0);

  async function nextRecipe(index) {
    setCurrentIndex(index++);
  }

  async function prevRecipe(index) {
    if (index >= 0) {
      setCurrentIndex(index--);
    }
  }

  useEffect(() => {
    async function getReciept() {
      try {
        const response = await fetch('https://dummyjson.com/recipes/')
        const data = await response.json();
        setRecipes(data.recipes[currentIndex]);
        if (currentIndex === 0) {
          setCurrentIndex(0);
        }
      } catch (error) {
        console.log('error')
      }
    }

    getReciept()
  }, [currentIndex])

  return (
    <div style={{ backgroundColor: "black", height: "100vh", width: "100%"}} className="App">
      <h1 style={{ color: "white"}}>Fetch API - Recipes</h1>
      <div>
        <div key={recipes.id}>
          <img src={recipes.image} width={500} height={500}></img>
          <h2 style={{ color: "white"}}>{recipes.name}</h2>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px"}}>
            <h4 style={{ color: "white", padding: "8px 16px", borderRadius: "10px", backgroundColor: "purple"}}>{recipes.cuisine}</h4>
            <h4 style={{ color: "white", padding: "8px 16px", borderRadius: "10px", backgroundColor: "green"}}>{recipes.difficulty}</h4>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px"}}>
            <h4 style={{ color: "white", padding: "8px 16px", borderRadius: "10px", backgroundColor: "darkgray"}}>Prep Time: {recipes.prepTimeMinutes}</h4>
            <h4 style={{ color: "white", padding: "8px 16px", borderRadius: "10px", backgroundColor: "darkgray"}}>Cook Time: {recipes.cookTimeMinutes}</h4>
            <h4 style={{ color: "white", padding: "8px 16px", borderRadius: "10px", backgroundColor: "darkgray"}}>Servings: {recipes.servings}</h4>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px"}}>
            <button onClick={() => prevRecipe(currentIndex--)} style={{ color: "white", padding: "8px 16px", borderRadius: "10px", backgroundColor: "darkgray"}}>Prev</button>
            <span style={{ color: "white", padding: "8px 16px", borderRadius: "10px"}}>{`${currentIndex + 1}`}</span>
            <button onClick={() => nextRecipe(currentIndex++)} style={{ color: "white", padding: "8px 16px", borderRadius: "10px", backgroundColor: "darkgray"}}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
