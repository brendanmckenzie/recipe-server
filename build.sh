set -ex

pushd cook-ui
yarn
GENERATE_SOURCEMAP=false yarn build

popd

go build -o recipe-server
