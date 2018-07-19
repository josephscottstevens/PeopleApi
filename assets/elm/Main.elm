--elm-make assets\elm\Main.elm --output=assets\vendor\elmApp.js


module Main exposing (main)

import Html exposing (..)
import Html.Attributes exposing (class, type_, style)
import Html.Events exposing (onClick)
import Http
import Json.Decode as Decode
import Json.Decode.Pipeline exposing (decode, required)
import Assets.Elm.Functions exposing (onlyDupes, countCharacters)


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type alias People =
    { id : Int
    , display_name : String
    , email_address : String
    , title : String
    }


type State
    = Loading
    | Error String
    | Loaded (List People)


type ShowType
    = None
    | UniqueCharacters
    | PossibleDuplicates


type alias Model =
    { state : State
    , rowId : Maybe Int
    , showType : ShowType
    }


type Msg
    = FetchPeople (Result Http.Error String)
    | ShowNone
    | ShowUniqueCharacters
    | ShowPossibleDuplicates
    | SelectRow Int


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FetchPeople (Ok peopleStr) ->
            ( case Decode.decodeString (Decode.list decodePeople) peopleStr of
                Ok people ->
                    { model | state = Loaded (filterPeople people) }

                Err err ->
                    { model | state = Error (toString err) }
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


view : Model -> Html Msg
view model =
    case model.state of
        Loading ->
            div [] [ text "Loading..." ]

        Error error ->
            div [] [ text error ]

        Loaded people ->
            render model people


renderRow : Maybe Int -> People -> Html Msg
renderRow rowId person =
    let
        backgroundColor =
            if rowId == Just person.id then
                "#eee"
            else
                "white"

        divStyle =
            [ ( "text-align", "center" )
            , ( "background-color", backgroundColor )
            ]
    in
        div [ style divStyle, onClick (SelectRow person.id) ]
            [ div [ class "col-sm-4" ] [ text person.title ]
            , div [ class "col-sm-4" ] [ text person.email_address ]
            , div [ class "col-sm-4" ] [ text person.display_name ]
            ]


renderHeader : Html Msg
renderHeader =
    let
        divStyle =
            [ ( "text-align", "center" )
            , ( "font-weight", "bold" )
            ]
    in
        div [ class "row" ]
            [ div [ class "col-sm-4" ] [ text "Title" ]
            , div [ class "col-sm-4" ] [ text "Email Address" ]
            , div [ class "col-sm-4" ] [ text "Display Name" ]
            ]


renderTable : List String -> List ( String, String ) -> Html Msg
renderTable headers rows =
    let
        bodyHelper ( t, y ) =
            tr []
                [ td [] [ text t ]
                , td [] [ text y ]
                ]

        headerHelper t =
            th [] [ text t ]
    in
        table []
            [ thead []
                [ tr [] <|
                    List.map headerHelper headers
                ]
            , tbody [] <|
                List.map bodyHelper rows
            ]


possibleDuplicates : List People -> List ( String, String )
possibleDuplicates people =
    people
        |> List.map (\t -> t.email_address)
        |> (\t -> onlyDupes t 2)


countCharactersHelper : List People -> Int -> List ( String, String )
countCharactersHelper people rowId =
    people
        |> List.filter (\t -> t.id == rowId)
        |> List.map (\t -> t.email_address)
        |> List.head
        |> Maybe.map countCharacters
        |> Maybe.withDefault []


renderDetails : Model -> List People -> Html Msg
renderDetails model people =
    case model.showType of
        None ->
            div [] []

        UniqueCharacters ->
            case model.rowId of
                Just rowId ->
                    renderTable [ "Character", "Count" ] (countCharactersHelper people rowId)

                Nothing ->
                    h4 [] [ text "Please select a person" ]

        PossibleDuplicates ->
            renderTable [ "Possible Duplicates", "" ] (possibleDuplicates people)


render : Model -> List People -> Html Msg
render model people =
    let
        btnStyle =
            [ ( "margin-bottom", "12px" )
            , ( "margin-right", "8px" )
            ]

        className t =
            if model.showType == t then
                "btn btn-primary"
            else
                "btn btn-default"
    in
        div [ class "container-fluid" ]
            [ div [ class "col-sm-8" ]
                [ div [ class "row" ]
                    [ button
                        [ style btnStyle
                        , onClick ShowNone
                        , type_ "button"
                        , class (className None)
                        ]
                        [ text "Show None" ]
                    , button
                        [ style btnStyle
                        , onClick ShowUniqueCharacters
                        , type_ "button"
                        ]
                        [ text "Show Unique Characters" ]
                    , button
                        [ style btnStyle
                        , onClick ShowPossibleDuplicates
                        , type_ "button"
                        ]
                        [ text "Show Possible Duplicates" ]
                    ]
                , renderHeader
                , div [] <|
                    List.map (\t -> renderRow model.rowId t) people
                ]
            , div [ class "col-sm-4" ]
                [ renderDetails model people
                ]
            ]


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


type alias MaybePeople =
    { id : Maybe Int
    , display_name : Maybe String
    , email_address : Maybe String
    , title : Maybe String
    }


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


init : ( Model, Cmd Msg )
init =
    ( { state = Loading
      , rowId = Nothing
      , showType = None
      }
    , Decode.string
        |> Http.get "http://localhost:4000/people"
        |> Http.send FetchPeople
    )
