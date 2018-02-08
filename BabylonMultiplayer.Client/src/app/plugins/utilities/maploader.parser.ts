export class MapLoaderParser {

    parse(data: string): BABYLON.AbstractMesh[] {

        var lineLast = "";
        let lines = data.split('\n');
        let brackOpen = 0;

        for (var i = 0; i < lines.length; i++) {
            let line = lines[i];

            if (brackOpen == 0) {
                if (line.substring(0, 1) == "{") {
                    brackOpen = brackOpen + 1;
                }
            }
            else {
                if (line.substring(0, 11) == "\"classname\"") { // new mesh
                    if (line.substring(0, 1) == "{") { // new entity

                    }
                }
                else if (line.substring(0, 1) == "\"") { // new property

                }
                else if (line.substring(0, 2) == "( ") { // new triangle
                    if (lineLast.substring(0, 1) == "{") {

                    }

                    console.log(line);
                }
                else if (line.substring(0, 1) == "}") {
                    brackOpen = brackOpen - 1;
                }
            }

            if (line.trim().length > 0) {
                lineLast = line;
            }
        }

        return null;
    }
}