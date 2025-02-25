import { NextResponse } from "next/server";
import * as fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  // Missing informations
  if (
    !body ||
    !body.firstname ||
    !body.lastname ||
    !body.email ||
    !body.pass ||
    !body.confirmPass
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Wrong confirmation
  if (body.confirmPass !== body.pass) {
    return NextResponse.json({ error: "Wrong password" }, { status: 400 });
  }

  // Creation
  try {
    const filePath = path.resolve(process.cwd(), "app/lib/users.json");

    // Lire les données existantes dans le fichier (ou créer une structure vide si le fichier est inexistant)
    let existingData = [];
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, "utf-8");
      existingData = fileContents ? JSON.parse(fileContents) : [];
    }

    // Encrypter le password
    const hashedPassword = await bcrypt.hash(body.pass, 10);

    // Ajouter les nouvelles données à la liste existante
    console.log("email :",body.email);
    
    const user = {
      "id": Date.now(),
      "firstname": body.firstname,
      "lastname": body.lastname,
      "email": body.email,
      "pass": hashedPassword,
      "role": "customer"
    } 
    existingData.push(user);

    // Convertir les données mises à jour en chaîne JSON
    const jsonData = JSON.stringify(existingData, null, 2);

    // Écrire les données mises à jour dans le fichier
    fs.writeFileSync(filePath, jsonData, "utf-8");
    return NextResponse.json({ message: "Created" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ jsonError: error }, { status: 400 });
  }
}
