module PeopleActions exposing (Model, People, ShowType(..), State(..), Msg(..), loadPeople, getPeople)

import Http
import Json.Decode as Decode
import Json.Decode.Pipeline exposing (decode, required)


type alias People =
    { id : Int
    , display_name : String
    , email_address : String
    , title : String
    }


type alias Model =
    { state : State
    , rowId : Maybe Int
    , showType : ShowType
    }


type State
    = Loading
    | Error String
    | Loaded (List People)


type ShowType
    = None
    | UniqueCharacters
    | PossibleDuplicates


type Msg
    = FetchPeople (Result Http.Error String)
    | ShowNone
    | ShowUniqueCharacters
    | ShowPossibleDuplicates
    | SelectRow Int


getPeople : Cmd Msg
getPeople =
    Decode.string
        |> Http.get "http://localhost:4000/people"
        |> Http.send FetchPeople


filterPeopleHelper : MaybePeople -> Maybe People
filterPeopleHelper maybePeople =
    case ( maybePeople.id, maybePeople.email_address ) of
        ( Just id, Just email ) ->
            Just
                { id = id
                , display_name = Maybe.withDefault "" maybePeople.display_name
                , email_address = email
                , title = Maybe.withDefault "" maybePeople.title
                }

        _ ->
            Nothing


type alias MaybePeople =
    { id : Maybe Int
    , display_name : Maybe String
    , email_address : Maybe String
    , title : Maybe String
    }


filterPeople : List MaybePeople -> List People
filterPeople maybePeoples =
    List.filterMap filterPeopleHelper maybePeoples


decodePeople : Decode.Decoder MaybePeople
decodePeople =
    decode MaybePeople
        |> required "id" (Decode.maybe Decode.int)
        |> required "display_name" (Decode.maybe Decode.string)
        |> required "email_address" (Decode.maybe Decode.string)
        |> required "title" (Decode.maybe Decode.string)


loadPeople : Model -> String -> Model
loadPeople model peopleStr =
    case Decode.decodeString (Decode.list decodePeople) peopleStr of
        Ok people ->
            { model | state = Loaded (filterPeople people) }

        Err err ->
            { model | state = Error (toString err) }
