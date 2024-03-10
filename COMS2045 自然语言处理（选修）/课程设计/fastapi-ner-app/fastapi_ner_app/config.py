class DefaultConfig:
    pickle_path = "./fastapi_ner_app/model/data.pkl"
    model_path = "./fastapi_ner_app/model/model_scripted.pt"

    embedding_dim = 100
    hidden_dim = 200
    dropout = 0.2


options = DefaultConfig()
