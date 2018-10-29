### SetUp ( Mac )
- MongoDB
```
$ brew install mongodb

# ログに従ってコマンドを3つくらい打つ
$ ln ....
$ ....
$ ....

$ mongo ( 起動コマンド )
```

初回の軌道の時点で`local`という名前のDBがあるか確認する。

- Express
```
yarn install
```

### Query sample
- Create
```
curl -X POST -H "Content-Type:application/graphql" -d 'mutation { add (name: "yes") { id, name } }' http://localhost:8080
```

- Read
```
# 一覧
curl -XPOST -H "Content-Type:application/graphql"  -d ' query { users { id, name } }' http:/ocalhost:8080

# UniqueIdで検索
curl -XPOST -H "Content-Type:application/graphql"  -d ' query { user(id:"xxxxxxxxxxxxxxxxx") { id, name } }' http:/ocalhost:8080
```

- Update
```
curl -X POST -H "Content-Type:application/graphql" -d 'mutation { update (id: "xxxxxxxxxxxxxxxxx", name:"ikechan") { id, name } }' http://localhost:8080
```

- Delete
```
curl -X POST -H "Content-Type:application/graphql" -d 'mutation { delete (id: "xxxxxxxxxxxxxxxxx") { id, name } }' http://localhost:8080
```