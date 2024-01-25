import React, { useEffect, useState } from "react";
import NotFound from "./NotFound";
import DeckView from "./DecksView";
import Header from "./Header";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { listDecks } from "../utils/api";
import Study from "../Study/Study";
import CreateDeck from "../Decks/CreateDeck";
import ViewDeck from "../Decks/ViewDeck";
import EditCard from "../Decks/EditCard";
import CreateCard from "../Decks/CreateCard";
import EditDeck from "../Decks/EditDeck";

// The Home screen has the following features:

// The path to this screen should be /.
// A Create Deck button is shown, and clicking it brings the user to the Create Deck screen.
// Existing decks are each shown with the deck name, the number of cards, and a Study, View, and Delete button.
// Clicking the Study button brings the user to the Study screen.
// Clicking the View button brings the user to the Deck screen.
// Clicking the Delete button shows a warning message before deleting the deck.

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      const response = await listDecks();
      setDecks(response)
    }
    loadDecks();
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
            <div className="container">
              <Link to="/decks/new">
                <button type="button" className="btn btn-primary btn-lg">Create Deck</button>
              </Link>
              {decks.map((deck, index) => <DeckView key={index} deck={deck}/>)}
            </div>
          </Route>

          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>

          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route exact path="/decks/:deckId">
            <ViewDeck />
          </Route>

          <Route exact path="/decks/:deckId/cards/new">
            <CreateCard />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route>
            <NotFound />
          </Route>
      </Switch>
    </>
  );
}

export default Layout;
