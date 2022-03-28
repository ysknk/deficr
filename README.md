# deficr

## Description

deficr = delivery file creator  
node package  

ファイル納品時の手間を削減するために作成。  
zipファイル化を楽にする。  
以下のようなケースに対応。  

* 全納品（特定のディレクトリ全て）  
* 差分納品（git diffベース）  

※書き出し後のファイルの中身については自己責任で確認すること。一切責任を負いません。  

## Requirement

* Node.js -> check cmd `node -v`
* Zip -> check cmd `zip -v`
* Git -> check cmd `git -v` *Git管理しているプロジェクトのみ対象

## Install

```sh
npm i -D https://github.com/ysknk/deficr.git
```

## Usage

### add script in package.json

```json
{
  "scripts": {
    "deficr": "deficr"
  },
}
```

```sh
# check arguments help
npm run deficr -- --help

# ex: all min options [./dist/ -> ./yymmdd.zip]
npm run deficr

# ex: diff min options [./$(zipTargetDir)/yymmdd.zip]
npm run deficr -- --mode diff --gsha $(gitHash) --gdroot "$(zipTargetDir)"
```

