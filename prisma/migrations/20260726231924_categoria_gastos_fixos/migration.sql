-- AlterTable
ALTER TABLE "user" ADD COLUMN     "rendaMensal" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "gastosFixos" (
    "id" SERIAL NOT NULL,
    "valor" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "idUser" INTEGER NOT NULL,

    CONSTRAINT "gastosFixos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoriaGasto" (
    "idCategoria" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idGastos" INTEGER NOT NULL,

    CONSTRAINT "categoriaGasto_pkey" PRIMARY KEY ("idCategoria")
);

-- AddForeignKey
ALTER TABLE "gastosFixos" ADD CONSTRAINT "gastosFixos_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoriaGasto" ADD CONSTRAINT "categoriaGasto_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoriaGasto" ADD CONSTRAINT "categoriaGasto_idGastos_fkey" FOREIGN KEY ("idGastos") REFERENCES "gastos"("idGastos") ON DELETE RESTRICT ON UPDATE CASCADE;
