-- CreateTable
CREATE TABLE "user" (
    "idUser" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "gastos" (
    "idGastos" SERIAL NOT NULL,
    "valor" INTEGER NOT NULL,
    "descricao" TEXT,
    "idUser" INTEGER NOT NULL,

    CONSTRAINT "gastos_pkey" PRIMARY KEY ("idGastos")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_telefone_key" ON "user"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "gastos" ADD CONSTRAINT "gastos_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;
