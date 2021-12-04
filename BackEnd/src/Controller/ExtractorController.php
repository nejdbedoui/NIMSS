<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Reclamation;
use App\Entity\User;
use App\Entity\Report;
use App\Entity\Employe;

use Symfony\Component\HttpFoundation\JsonResponse;

class ExtractorController extends AbstractController
{/**
     * @Route("/extractor", name="extractor")
     */
    public function problemAction(): Response
    {
        $em = $this->getDoctrine()->getManager();

        $repository = $this->getDoctrine()->getRepository(Reclamation::class)->findall();

        $data = array();   
        if($repository) {
        foreach($repository as $key=>$rec){
            $data[$key]['type']= $rec->getType();
            $data[$key]['description']= $rec->getDescription();
            $data[$key]['statut']= $rec->getStatut();
            $data[$key]['date_creation']= $rec->getDateCreation()->format('d/m/y');
            $data[$key]['id_user']= $rec->getIdu()->getID();
            $data[$key]['id']= $rec->getId();
            $data[$key]['stat']= 'success';
        }
        
        
        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }else{
    $data[0]['stat']= '404';
    $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }
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
        if($repository) { 
        foreach($repository as $key=>$rec){
            $data[$key]['type']= $rec->getType();
            $data[$key]['description']= $rec->getDescription();
            $data[$key]['statut']= $rec->getStatut();
            $data[$key]['date_creation']= $rec->getDateCreation()->format('d/m/y');
            $data[$key]['id_user']= $rec->getIdu()->getID();
            $data[$key]['id']= $rec->getId();
            $data[$key]['stat']= 'success';
        }
        
        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;
    }else{
        $data[0]['stat']= '404';
        $response = new jsonResponse($data);
        $response->headers->set('Access-Control-Allow-Origin', '*');
    
            return $response;
        }
        
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
        if($user){
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

        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }else{
        $data = array(
            'stat'=>'404',
        );
        $response = new jsonResponse($data);
        $response->headers->set('Access-Control-Allow-Origin', '*');
    
            return $response;
        }
        
        
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
    if($new && $todo && $finished){
    $data = array(
        'New'=>$new,
        'Treated'	=>$todo,
        'Inprogress'	=>$finished
    );

    $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }else{
        $data = array(
            'stat'=>'404',
        );
        $response = new jsonResponse($data);
        $response->headers->set('Access-Control-Allow-Origin', '*');
    
            return $response;
        }
        
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
            'image'=>$user->getImage(),
            "role"=>'user'
        );
        $response = new jsonResponse($userarray);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }
        else{
            $repository = $this->getDoctrine()->getRepository(Employe::class);
            $json = $request->get('json');
            $params = json_decode($json);
            $user = $repository->findOneBy(['email' => $params->email,'password' => $params->password]);
            if($user!=null){
            $userarray = array(
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'name' => $user->getFullName(),
                'phone'=>$user->getPhoneNumber(),
                'image'=>$user->getImage(),
                "role"=>$user->getRole()
            );
            
            $response = new jsonResponse($userarray);
            $response->headers->set('Access-Control-Allow-Origin', '*');
        
                return $response;
        }
        $data=array(
            'stat' => '404'
        );
        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
        }
        $data=array(
            'stat' => '404'
        );
        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
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
                'stat'=>'success',
            );
            $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
        }
        else
        {
            $data = array(
                'stat'=>'404',
            );
            $response = new jsonResponse($data);
            $response->headers->set('Access-Control-Allow-Origin', '*');
        
                return $response;
        }
    }


 /**
     * @Route("/deleteR/{id}", name="deleteR")
     */
    public function deleteR($id): Response{
        $em = $this->getDoctrine()->getManager();

        $em = $this->getDoctrine()->getManager();
        $rec = $em->getRepository(Report::class)->findOneBy(['id' => $id]);

        if($rec!=null)
        {
            $em->remove($rec);
            $em->flush();
            $data = array(
                'stat'=>'success',
            );
            $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
        }
        else
        {
            $data = array(
                'stat'=>'404',
            );
            $response = new jsonResponse($data);
            $response->headers->set('Access-Control-Allow-Origin', '*');
        
                return $response;
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
            
            $response = new jsonResponse('success');
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
        }
        else
        {
            $data = array(
                'stat'=>'404',
            );
            $response = new jsonResponse($data);
            $response->headers->set('Access-Control-Allow-Origin', '*');
        
                return $response;
        }
    }

     /**
     * @Route("/detail/{id}", name="Details")
     */

    public function getProblem(Request $request,$id=null): Response{
        
        $em = $this->getDoctrine()->getManager();
        $dql = "SELECT R,U.Full_name as user FROM App\Entity\Reclamation R LEFT JOIN App\Entity\User U"
                ." WITH IDENTITY(R.idu,'id') = U.id"
                ." WHERE (R.id=:id)";
        $query = $em->createQuery($dql);

        $query->setParameter('id', $id);

        $problem = $query->getArrayResult();
        if($problem){
            $data = array(
            'status'=>'success',
            'code'	=>200,
            'data'	=>$problem,
            'msg'	=>'Task detail'
        );

        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }else
        {
            $data = array(
                'stat'=>'404',
            );
            $response = new jsonResponse($data);
            $response->headers->set('Access-Control-Allow-Origin', '*');
        
                return $response;
        }
   
    }

    /**
     * @Route("/update", name="updatefgh", methods="POST")
     */
    public function updaterec(Request $request): Response{
        $em = $this->getDoctrine()->getManager();
        $repository = $this->getDoctrine()->getRepository(Reclamation::class);


        $json = $request->get('json');
        $params = json_decode($json);
        $rec = $repository->findOneBy(['id' =>$params->id]);
        if($params->statut == $rec->getStatut()){
            $data = array(
                'stat'=>'404',
            );
        }
        else{
        $rec->setStatut($params->statut);
        $em->persist($rec);
        $em->flush();
        $data = array(
            'status'=>'success',
            'code'    =>200,
        );
        }


    
        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }

   /**
     * @Route("/newR", name="report", methods="POST")
    */
    public function newR(Request $request): Response{
        $em = $this->getDoctrine()->getManager();

        $json = $request->get('json');
        $params = json_decode($json);
        $createdAt = new \Datetime('now');
        $repemp = $this->getDoctrine()->getRepository(Employe::class);
        $reprec = $this->getDoctrine()->getRepository(Reclamation::class);
        $emp = $repemp->findOneBy(['id' =>$params->idEmploye]);
        $rec = $reprec->findOneBy(['id' =>$params->idProbleme]);
        $rapport = new Report();
        $rapport->setIdEmploye($emp);
        $rapport->setidReclamation($rec);
        $rapport->setDescription($params->description);
        $rapport->setCreationDate($createdAt);

        $em->persist($rapport);
        $em->flush();

        $data = array(
            'status'=>'success',

            'code'    =>200,
        );
        $response = new jsonResponse($data);

    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }
    /**
     * @Route("/allreports/{id}", name="allreports")
     */
    public function reportAction(Request $request,$id=null): Response
    {
        $em = $this->getDoctrine()->getManager();
        $repository = $this->getDoctrine()->getRepository(Report::class)->findBy(array('idReclamation' => $id), array('creationDate' => 'DESC'));
        $data = array();    
        if($repository)
        {
        foreach($repository as $key=>$rec){
            $data[$key]['nom']= $rec->getIdEmploye()->getFullName();
            $data[$key]['desc']= $rec->getDescription();
            $data[$key]['id']= $rec->getIdReclamation();
            $data[$key]['date_creation']= $rec->getCreationDate()->format('d/m/y');
            $data[$key]['role']= $rec->getIdEmploye()->getRole();
            $data[$key]['image']= $rec->getIdEmploye()->getImage();
            $data[$key]['stat']= 'success';
        }
        
        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }else{
        $data = array();
        $data[0]['stat']= '404';

        $response = new jsonResponse($data);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;
    }
    }



    /**
     * @Route("/signup", name="signup", methods="POST")
     */
    public function signupAction(Request $request): Response{
        $em = $this->getDoctrine()->getManager();
        $repository = $this->getDoctrine()->getRepository(User::class);
        $json = $request->get('json');
        $params = json_decode($json);
        $rec = new User();
        $rec->setFullName($params->Full_name);
        $rec->setEmail($params->email);
        $rec->setPhoneNumber($params->phone_number);
        $rec->setPassword($params->password);
        $rec->setImage($params->image);
        $em->persist($rec);
		$em->flush();
        $data = array(
            'status'=>'success',
            'code'	=>200,
            'data'	=>$rec,
            'msg'	=>'detail'
        );

        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;
    }

}
