<?php

namespace App\Entity;

use App\Repository\RapportRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=RapportRepository::class)
 */
class Rapport
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Employe::class, inversedBy="rapports")
     * @ORM\JoinColumn(nullable=false)
     */
    private $id_employe;

    /**
     * @ORM\ManyToOne(targetEntity=Reclamation::class, inversedBy="rapports")
     * @ORM\JoinColumn(nullable=false)
     */
    private $id_problem;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="datetime")
     */
    private $creation_date;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdEmploye(): ?Employe
    {
        return $this->id_employe;
    }

    public function setIdEmploye(?Employe $id_employe): self
    {
        $this->id_employe = $id_employe;

        return $this;
    }

    public function getIdProblem(): ?Reclamation
    {
        return $this->id_problem;
    }

    public function setIdProblem(?Reclamation $id_problem): self
    {
        $this->id_problem = $id_problem;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCreationDate(): ?\DateTimeInterface
    {
        return $this->creation_date;
    }

    public function setCreationDate(\DateTimeInterface $creation_date): self
    {
        $this->creation_date = $creation_date;

        return $this;
    }
}
