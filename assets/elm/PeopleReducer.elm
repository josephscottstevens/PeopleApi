module PeopleReducer exposing (init, update)

import PeopleActions exposing (Model, People, ShowType(..), State(..), Msg(..), loadPeople, getPeople)


init : ( Model, Cmd Msg )
init =
    ( { state = Loading
      , rowId = Nothing
      , showType = None
      }
    , getPeople
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FetchPeople (Ok peopleStr) ->
            ( loadPeople model peopleStr
            , Cmd.none
            )

        FetchPeople (Err err) ->
            ( { model | state = Error (toString err) }
            , Cmd.none
            )

        ShowNone ->
            ( { model | showType = None }
            , Cmd.none
            )

        ShowUniqueCharacters ->
            ( { model | showType = UniqueCharacters }
            , Cmd.none
            )

        ShowPossibleDuplicates ->
            ( { model | showType = PossibleDuplicates }
            , Cmd.none
            )

        SelectRow rowId ->
            ( { model | rowId = Just rowId }
            , Cmd.none
            )
