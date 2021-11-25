<?php

namespace App\Entity;

use App\Repository\RatingRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=RatingRepository::class)
 */
class Rating
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="ratings")
     * @ORM\JoinColumn(nullable=false)
     */
    private $idclient;

    /**
     * @ORM\ManyToOne(targetEntity=Employe::class, inversedBy="ratings")
     * @ORM\JoinColumn(nullable=false)
     */
    private $idEmploye;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $rating;

    /**
     * @ORM\ManyToOne(targetEntity=Reclamation::class, inversedBy="ratings")
     * @ORM\JoinColumn(nullable=false)
     */
    private $idticket;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdclient(): ?User
    {
        return $this->idclient;
    }

    public function setIdclient(?User $idclient): self
    {
        $this->idclient = $idclient;

        return $this;
    }

    public function getIdEmploye(): ?Employe
    {
        return $this->idEmploye;
    }

    public function setIdEmploye(?Employe $idEmploye): self
    {
        $this->idEmploye = $idEmploye;

        return $this;
    }

    public function getRating(): ?int
    {
        return $this->rating;
    }

    public function setRating(?int $rating): self
    {
        $this->rating = $rating;

        return $this;
    }

    public function getIdticket(): ?Reclamation
    {
        return $this->idticket;
    }

    public function setIdticket(?Reclamation $idticket): self
    {
        $this->idticket = $idticket;

        return $this;
    }
}
