const Alexa = require("ask-sdk-core");
const { httpService } = require("./services/http.js");

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput) {
    const speakOutput =
      "Bem vindo, sobre qual pokemon você deseja saber mais detalhes?";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const GetPokemonIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "GetPokemonIntent"
    );
  },
  async handle(handlerInput) {
    const pokemonName =
      handlerInput.requestEnvelope.request.intent.slots.pokemonName.value;
    const pokemon = await httpService.getPokemon(pokemonName);
    const pokemonSpeakOutput = `${pokemon.name} é um pokemon da categoria ${pokemon.types[0].type.name}`;
    return handlerInput.responseBuilder
      .speak(pokemonSpeakOutput)
      .reprompt(pokemonSpeakOutput)
      .getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speakOutput =
      "Desculpe, não consegui interpretar sua intenção. Por favor, tente novamente.";
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(LaunchRequestHandler, GetPokemonIntentHandler)
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent("sample/hello-world/v1.2")
  .lambda();
