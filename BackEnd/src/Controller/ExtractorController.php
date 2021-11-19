<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Reclamation;
use App\Entity\User;
use App\Entity\Employe;
use Symfony\Component\HttpFoundation\JsonResponse;

class ExtractorController extends AbstractController
{
    /**
     * @Route("/extractor", name="extractor")
     */
    public function problemAction(): Response
    {
        $em = $this->getDoctrine()->getManager();

        $repository = $this->getDoctrine()->getRepository(Reclamation::class)->findall();

        $data = array();    
        foreach($repository as $key=>$rec){
            $data[$key]['type']= $rec->getType();
            $data[$key]['description']= $rec->getDescription();
            $data[$key]['statut']= $rec->getStatut();
            $data[$key]['date_creation']= $rec->getDateCreation()->format('d/m/y');
            $data[$key]['id_user']= $rec->getIdu()->getID();
            $data[$key]['id']= $rec->getId();
            $data[$key]['stat']= 'success';
        }
        
        return new jsonResponse($data);
        
    }

    /**
     * @Route("/extractor1/{id}", name="extractor id")
     */
    public function problelistmAction($id): Response
    {
        $em = $this->getDoctrine()->getManager();

        $em = $this->getDoctrine()->getManager();
        $repository = $em->getRepository(Reclamation::class)->findBy(array(
            'idu'=>$id
        ));

        $data = array();    
        foreach($repository as $key=>$rec){
            $data[$key]['type']= $rec->getType();
            $data[$key]['description']= $rec->getDescription();
            $data[$key]['statut']= $rec->getStatut();
            $data[$key]['date_creation']= $rec->getDateCreation()->format('d/m/y');
            $data[$key]['id_user']= $rec->getIdu()->getID();
            $data[$key]['id']= $rec->getId();
            $data[$key]['stat']= 'success';
        }
        
        return new jsonResponse($data);
        
    }
    


    /**
     * @Route("/newC", name="egh", methods="POST")
     */
    public function newAction(Request $request): Response{
        $em = $this->getDoctrine()->getManager();
        $repository = $this->getDoctrine()->getRepository(User::class);
        

        $json = $request->get('json');
        $params = json_decode($json);
        $createdAt = new \Datetime('now');

        $rec = new Reclamation();
        $user = $repository->findOneBy(['id' =>$params->id]);
        $rec->setIdu($user);
        $rec->settype($params->type);
        $rec->setDescription($params->description);
        $rec->setStatut($params->status);
        $rec->setDateCreation($createdAt);

        $em->persist($rec);
		$em->flush();

        $data = array(
            'status'=>'success',
            'code'	=>200,
            'data'	=>$rec,
            'msg'	=>'detail'
        );

        return new jsonResponse($data);
    }
    
  /**
     * @Route("/dashboard", name="dashboard")
     */
    public function typeAction(Request $request): Response{
    $em = $this->getDoctrine()->getManager();
    $new = count($em->getRepository(Reclamation::class)->findBy(array(
        'statut'=>'New'
    )));
    $todo = count($em->getRepository(Reclamation::class)->findBy(array(
        'statut'=>'Treated'
    )));
    $finished = count($em->getRepository(Reclamation::class)->findBy(array(
        'statut'=>'Inprogress'
    )));
    $data = array(
        'New'=>$new,
        'Treated'	=>$todo,
        'Inprogress'	=>$finished
    );

return new jsonResponse($data);

    
}
/**
     * @Route("/login", name="login", methods="POST")
     */
    public function login(Request $request): Response{
        $repository = $this->getDoctrine()->getRepository(User::class);
        $json = $request->get('json');
        $params = json_decode($json);
        $user = $repository->findOneBy(['email' => $params->email,'password' => $params->password]);

        if($user!=null){
        $userarray = array(
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'name' => $user->getFullName(),
            'phone'=>$user->getPhoneNumber(),
            "role"=>'user'
        );
        return new jsonResponse($userarray);
    }
        else{
            $repository = $this->getDoctrine()->getRepository(Employe::class);
            $json = $request->get('json');
            $params = json_decode($json);
            $user = $repository->findOneBy(['email' => $params->email,'password' => $params->password]);
            if($user!=null)
            $userarray = array(
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'name' => $user->getFullName(),
                'phone'=>$user->getPhoneNumber(),
                "role"=>$user->getRole()
            );
            
        return new jsonResponse($userarray);
        
        }
        return new jsonResponse('SIKE');
    }

    /**
     * @Route("/supp/{id}", name="supp")
     */
    public function suppRec($id): Response{
        $em = $this->getDoctrine()->getManager();

        $em = $this->getDoctrine()->getManager();
        $rec = $em->getRepository(Reclamation::class)->findOneBy(['id' => $id]);

        if($rec!=null)
        {
            $em->remove($rec);
            $em->flush();
            $data = array(
                'status'=>'success',
            );
            return new jsonResponse($data);
        }
        else
        {
            $data = array(
                'status'=>'error',
            );
             return new jsonResponse($data);
        }
    }
      /**
     * @Route("/editRec", name="edit")
     */
    public function editRec(Request $request): Response{
        $repository = $this->getDoctrine()->getRepository(Reclamation::class);
        $em = $this->getDoctrine()->getManager();
        $json = $request->get('json');
        $params = json_decode($json);
        $rec = $repository->findOneBy(['id' => $params->id]);
        
        if($rec!=null)
        {
            $rec->setType($params->type);
            $rec->setDescription($params->description);
            $rec->setStatut($params->statut);
            $rec->setDateCreation($params->date_creation);
            $rec->setIdu($params->idu);

            $em->persist($rec);
            $em->flush();
            
            return new jsonResponse('success');
        }
        else
        {
             return new jsonResponse('SIKE');
        }
    }
}
